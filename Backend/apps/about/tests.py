from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from .models import AboutParagraph, AboutStat, Interest


class AboutApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def test_only_active_about_content_is_returned(self):
        AboutStat.objects.create(label="Active", value="1", is_active=True)
        AboutStat.objects.create(label="Hidden", value="2", is_active=False)
        AboutParagraph.objects.create(text="Visible", is_active=True)
        AboutParagraph.objects.create(text="Hidden", is_active=False)
        Interest.objects.create(label="Visible", is_active=True)
        Interest.objects.create(label="Hidden", is_active=False)

        response = self.client.get("/api/v1/portfolio/about/")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual([item["label"] for item in data["stats"]], ["Active"])
        self.assertEqual([item["text"] for item in data["paragraphs"]], ["Visible"])
        self.assertEqual([item["label"] for item in data["interests"]], ["Visible"])
