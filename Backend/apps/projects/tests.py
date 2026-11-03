from django.core.cache import cache
from django.db import connection
from django.test import TestCase
from django.test.utils import CaptureQueriesContext
from rest_framework.test import APIClient

from .models import CaseStudy, Project, ProjectFeature, Tag, Tech


class ProjectApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.project = Project.objects.create(
            slug="demo",
            title="Demo Project",
            short_desc="Short",
            description="Long description",
            is_featured=True,
        )
        self.project.tags.set([Tag.objects.create(name="Django")])
        self.project.tech.set([Tech.objects.create(name="PostgreSQL")])
        ProjectFeature.objects.create(project=self.project, text="Feature one")
        CaseStudy.objects.create(project=self.project, problem="P", solution="S", outcome="O")

    def test_project_list_and_detail_payloads(self):
        response = self.client.get("/api/v1/portfolio/projects/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

        detail = self.client.get("/api/v1/portfolio/projects/demo/")
        self.assertEqual(detail.status_code, 200)
        payload = detail.json()
        self.assertEqual(payload["tags"], ["Django"])
        self.assertEqual(payload["tech"], ["PostgreSQL"])
        self.assertEqual(payload["features"], ["Feature one"])
        self.assertEqual(payload["case_study"]["problem"], "P")

    def test_project_filters(self):
        other = Project.objects.create(slug="other", title="Other", is_featured=False)
        other.tags.set([Tag.objects.create(name="React")])

        featured = self.client.get("/api/v1/portfolio/projects/?featured=true")
        self.assertEqual(featured.status_code, 200)
        self.assertEqual([project["slug"] for project in featured.json()], ["demo"])

        tag = self.client.get("/api/v1/portfolio/projects/?tag=react")
        self.assertEqual(tag.status_code, 200)
        self.assertEqual([project["slug"] for project in tag.json()], ["other"])

        search = self.client.get("/api/v1/portfolio/projects/?search=Demo")
        self.assertEqual(search.status_code, 200)
        self.assertEqual([project["slug"] for project in search.json()], ["demo"])

    def test_project_without_case_study(self):
        Project.objects.create(slug="no-case", title="No case", short_desc="Short")
        response = self.client.get("/api/v1/portfolio/projects/no-case/")
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.json()["case_study"])

    def test_unpublished_project_is_hidden(self):
        self.project.is_published = False
        self.project.save()
        response = self.client.get("/api/v1/portfolio/projects/demo/")
        self.assertEqual(response.status_code, 404)

    def test_project_list_query_count_stays_constant(self):
        for index in range(5):
            project = Project.objects.create(slug=f"project-{index}", title=f"Project {index}")
            project.tags.set([Tag.objects.create(name=f"Tag {index}")])
            project.tech.set([Tech.objects.create(name=f"Tech {index}")])

        with CaptureQueriesContext(connection) as queries:
            response = self.client.get("/api/v1/portfolio/projects/")

        self.assertEqual(response.status_code, 200)
        self.assertLessEqual(len(queries), 4)
