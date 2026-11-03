from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .filters import ProjectFilter
from .selectors import get_published_project, get_published_projects
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProjectListSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

    @extend_schema(
        summary="List published projects",
        description="Supports `featured`, `tag`, and `search` query parameters.",
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return get_published_projects()

    def filter_queryset(self, queryset):
        return super().filter_queryset(queryset).distinct()


class ProjectDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProjectDetailSerializer
    lookup_field = "slug"

    @extend_schema(summary="Get a published project")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_object(self):
        return get_published_project(self.kwargs["slug"])
