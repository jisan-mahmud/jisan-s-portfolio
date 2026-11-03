import django_filters
from django.db.models import Q

from .models import Project


class ProjectFilter(django_filters.FilterSet):
    featured = django_filters.BooleanFilter(method="filter_featured", label="Featured")
    tag = django_filters.CharFilter(field_name="tags__slug", label="Tag slug")
    search = django_filters.CharFilter(method="filter_search", label="Search")

    class Meta:
        model = Project
        fields = ["featured", "tag", "search"]

    def filter_featured(self, queryset, name, value):
        return queryset.filter(is_featured=value)

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(short_desc__icontains=value) | Q(description__icontains=value)
        )
