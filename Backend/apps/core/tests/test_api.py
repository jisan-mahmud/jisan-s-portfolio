from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from apps.about.models import AboutParagraph, AboutStat, Interest
from apps.projects.models import CaseStudy, Project, ProjectFeature, Tag, Tech
from apps.resume.models import Education, Experience
from apps.skills.models import Skill, SkillCategory

from ..cache import get_home_cache_key
from ..models import SiteProfile, SocialLink


class PortfolioApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        SiteProfile.objects.update_or_create(
            pk=1,
            defaults={
                "full_name": "Test Person",
                "roles": ["Backend Developer"],
                "intro_skills": ["Python"],
                "codeforces_handle": "tester",
                "leetcode_username": "tester",
            },
        )
        SocialLink.objects.create(label="GitHub", url="https://github.com/test", icon_key="github")
        AboutStat.objects.create(label="Experience", value="2+ Years", icon_key="briefcase")
        AboutParagraph.objects.create(text="Summary", expanded_only=False)
        AboutParagraph.objects.create(text="More", expanded_only=True)
        Interest.objects.create(label="Open Source", color="green")
        Experience.objects.create(title="Backend Developer", company="Acme")
        Education.objects.create(degree="B.Sc. CSE", institution="Test University")
        category = SkillCategory.objects.create(label="Backend", color="green")
        Skill.objects.create(category=category, name="Django", icon_key="django")
        self.project = Project.objects.create(
            slug="demo",
            title="Demo Project",
            short_desc="Short",
            description="Long description",
        )
        self.project.tags.set([Tag.objects.create(name="Django")])
        self.project.tech.set([Tech.objects.create(name="PostgreSQL")])
        ProjectFeature.objects.create(project=self.project, text="Feature one")
        CaseStudy.objects.create(project=self.project, problem="P", solution="S", outcome="O")

    def test_home_payload_is_aggregated(self):
        response = self.client.get("/api/v1/portfolio/home/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["profile"]["full_name"], "Test Person")
        self.assertEqual(data["about"]["stats"][0]["label"], "Experience")
        self.assertEqual(data["projects"][0]["slug"], "demo")
        self.assertEqual(data["technologies"][0]["skills"][0]["name"], "Django")
        self.assertEqual(data["integrations"]["codeforces_handle"], "tester")

    def test_home_payload_is_cached(self):
        self.client.get("/api/v1/portfolio/home/")
        self.assertIsNotNone(cache.get(get_home_cache_key()))

    def test_m2m_change_invalidates_home_cache(self):
        self.client.get("/api/v1/portfolio/home/")
        self.project.tags.add(Tag.objects.create(name="API"))
        response = self.client.get("/api/v1/portfolio/home/")
        self.assertIn("API", response.json()["projects"][0]["tags"])

    def test_profile_endpoint(self):
        response = self.client.get("/api/v1/portfolio/profile/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["socials"][0]["label"], "GitHub")

    def test_health_endpoint(self):
        response = self.client.get("/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "database": True, "cache": True})
