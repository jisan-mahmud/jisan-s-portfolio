from unittest.mock import patch

from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from apps.core.models import SiteProfile


class IntegrationProxyTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        SiteProfile.objects.update_or_create(
            pk=1,
            defaults={"codeforces_handle": "default-cf", "leetcode_username": "default-lc"},
        )

    @patch("apps.integrations.views.fetch_codeforces")
    def test_codeforces_proxy(self, fetch_codeforces):
        fetch_codeforces.return_value = {"user": {"handle": "tester"}, "contests": []}
        response = self.client.get("/api/v1/integrations/codeforces/tester/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["user"]["handle"], "tester")
        fetch_codeforces.assert_called_once_with("tester")

    @patch("apps.integrations.views.fetch_leetcode")
    def test_leetcode_proxy(self, fetch_leetcode):
        fetch_leetcode.return_value = {"username": "tester", "totalSolved": 10}
        response = self.client.get("/api/v1/integrations/leetcode/tester/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["totalSolved"], 10)
        fetch_leetcode.assert_called_once_with("tester")

    @patch("apps.integrations.views.fetch_codeforces")
    def test_codeforces_uses_profile_default(self, fetch_codeforces):
        fetch_codeforces.return_value = {"user": {"handle": "default-cf"}, "contests": []}
        response = self.client.get("/api/v1/integrations/codeforces/")
        self.assertEqual(response.status_code, 200)
        fetch_codeforces.assert_called_once_with("default-cf")
