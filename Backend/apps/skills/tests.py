from django.core.cache import cache
from django.db import connection
from django.test import TestCase
from django.test.utils import CaptureQueriesContext
from rest_framework.test import APIClient

from .models import Skill, SkillCategory


class SkillsApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def test_only_active_skills_are_returned(self):
        category = SkillCategory.objects.create(label="Backend", is_active=True)
        Skill.objects.create(category=category, name="Django", is_active=True)
        Skill.objects.create(category=category, name="Hidden", is_active=False)
        hidden_category = SkillCategory.objects.create(label="Hidden", is_active=False)
        Skill.objects.create(category=hidden_category, name="Flask", is_active=True)

        response = self.client.get("/api/v1/portfolio/technologies/")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["label"], "Backend")
        self.assertEqual([skill["name"] for skill in data[0]["skills"]], ["Django"])

    def test_skill_list_query_count_stays_constant(self):
        for index in range(5):
            category = SkillCategory.objects.create(label=f"Category {index}")
            for skill_index in range(3):
                Skill.objects.create(category=category, name=f"Skill {index}-{skill_index}")

        with CaptureQueriesContext(connection) as queries:
            response = self.client.get("/api/v1/portfolio/technologies/")

        self.assertEqual(response.status_code, 200)
        self.assertLessEqual(len(queries), 3)
