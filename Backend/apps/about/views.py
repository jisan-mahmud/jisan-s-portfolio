from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .selectors import get_about_data
from .serializers import AboutSerializer


class AboutView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(summary="Get about section content", responses=AboutSerializer)
    def get(self, request):
        return Response(AboutSerializer(get_about_data()).data)
