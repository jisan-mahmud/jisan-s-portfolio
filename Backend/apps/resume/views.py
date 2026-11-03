from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .selectors import get_active_education, get_active_experiences
from .serializers import EducationSerializer, ExperienceSerializer


class ExperienceListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExperienceSerializer
    pagination_class = None

    @extend_schema(summary="List work experience")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return get_active_experiences()


class EducationListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = EducationSerializer
    pagination_class = None

    @extend_schema(summary="List education history")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return get_active_education()
