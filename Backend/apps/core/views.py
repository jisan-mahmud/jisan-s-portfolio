from django.core.cache import cache
from django.db import connection
from django.http import JsonResponse
from drf_spectacular.utils import OpenApiTypes, extend_schema
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .selectors import get_site_profile
from .serializers import ProfileSerializer
from .services import get_home_payload


class HomeView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(summary="Get the aggregated portfolio home payload", responses=OpenApiTypes.OBJECT)
    def get(self, request):
        return Response(get_home_payload())


class ProfileView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(summary="Get the site profile and social links", responses=ProfileSerializer)
    def get(self, request):
        return Response(ProfileSerializer(get_site_profile()).data)


def health_check(request):
    database_ok = True
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except Exception:
        database_ok = False

    try:
        cache.set("portfolio:health", "ok", 10)
        cache_ok = cache.get("portfolio:health") == "ok"
    except Exception:
        cache_ok = False

    status = 200 if database_ok else 503
    return JsonResponse(
        {
            "status": "ok" if database_ok else "degraded",
            "database": database_ok,
            "cache": cache_ok,
        },
        status=status,
    )
