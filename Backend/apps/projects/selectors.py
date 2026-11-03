from django.db.models import Prefetch
from django.shortcuts import get_object_or_404

from .models import Project, ProjectFeature


def get_published_projects():
    return Project.objects.filter(is_published=True).prefetch_related("tags", "tech")


def get_published_project(slug):
    queryset = Project.objects.prefetch_related(
        "tags",
        "tech",
        Prefetch("features", queryset=ProjectFeature.objects.order_by("order", "id")),
    ).select_related("case_study")
    return get_object_or_404(queryset, slug=slug, is_published=True)
