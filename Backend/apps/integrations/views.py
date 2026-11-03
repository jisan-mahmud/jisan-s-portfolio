from drf_spectacular.utils import OpenApiTypes, extend_schema
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.core.models import SiteProfile

from .services import fetch_codeforces, fetch_leetcode


class CodeforcesView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(summary="Get Codeforces profile and contest history", responses=OpenApiTypes.OBJECT)
    def get(self, request, handle=None):
        handle = handle or request.query_params.get("handle") or SiteProfile.load().codeforces_handle

        if not handle:
            return Response({"user": None, "contests": []})

        try:
            return Response(fetch_codeforces(handle))
        except Exception:
            return Response({"user": None, "contests": []})


class LeetcodeView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(summary="Get LeetCode solved counts and profile", responses=OpenApiTypes.OBJECT)
    def get(self, request, username=None):
        username = username or request.query_params.get("username") or SiteProfile.load().leetcode_username

        if not username:
            return Response({"username": None, "totalSolved": 0, "problemTags": {}})

        try:
            return Response(fetch_leetcode(username))
        except Exception:
            return Response({"username": None, "totalSolved": 0, "problemTags": {}})
