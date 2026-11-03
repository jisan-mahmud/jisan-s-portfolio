from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from apps.projects.models import Project
from apps.resume.models import Education, Experience
from apps.skills.models import SkillCategory


class PortfolioAdminTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user_model = get_user_model()
        cls.admin_user = user_model.objects.create_superuser(
            username="portfolio-admin",
            email="admin@example.com",
            password="test-password",
        )
        Project.objects.create(slug="published", title="Published", is_published=True)
        Project.objects.create(slug="draft", title="Draft", is_published=False)
        Experience.objects.create(title="Developer", company="Example")
        Education.objects.create(degree="BSc", institution="Example University")
        SkillCategory.objects.create(label="Backend")

    def setUp(self):
        self.client.force_login(self.admin_user)

    def test_dashboard_summarizes_content_and_links_to_admin(self):
        response = self.client.get(reverse("admin:index"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Portfolio overview")
        self.assertContains(response, "Quick links")
        stats = {item["label"]: item["value"] for item in response.context["dashboard_stats"]}
        self.assertEqual(
            stats,
            {
                "Published projects": 1,
                "Draft projects": 1,
                "Experience entries": 1,
                "Education entries": 1,
                "Skill categories": 1,
            },
        )
        self.assertContains(
            response,
            reverse("admin:projects_project_changelist"),
        )

    def test_project_admin_uses_unfold_change_list(self):
        response = self.client.get(reverse("admin:projects_project_changelist"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Published")
        self.assertContains(response, "Draft")

    def test_dashboard_hides_summaries_without_model_permissions(self):
        staff_user = get_user_model().objects.create_user(
            username="limited-staff",
            password="test-password",
            is_staff=True,
        )
        self.client.force_login(staff_user)

        response = self.client.get(reverse("admin:index"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["dashboard_stats"], [])
        self.assertEqual(response.context["dashboard_links"], [])
        self.assertContains(response, "You do not have permission")
