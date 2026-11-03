from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Education, EducationHighlight, Experience, ExperienceHighlight


class ResumeApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def test_experience_prefetch_returns_ordered_highlights(self):
        experience = Experience.objects.create(title="Backend Developer", company="Acme", order=0)
        ExperienceHighlight.objects.create(experience=experience, text="Second", order=1)
        ExperienceHighlight.objects.create(experience=experience, text="First", order=0)
        Experience.objects.create(title="Hidden", company="Acme", is_active=False)

        response = self.client.get("/api/v1/portfolio/experience/")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["highlights"], ["First", "Second"])

    def test_education_returns_only_active_records(self):
        education = Education.objects.create(degree="B.Sc. CSE", institution="University")
        EducationHighlight.objects.create(education=education, text="Coursework")
        Education.objects.create(degree="Hidden", institution="University", is_active=False)

        response = self.client.get("/api/v1/portfolio/education/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["highlights"], ["Coursework"])
