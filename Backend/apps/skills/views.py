from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .selectors import get_active_skill_categories
from .serializers import SkillCategorySerializer


class TechnologyListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SkillCategorySerializer
    pagination_class = None

    @extend_schema(summary="List technologies grouped by category")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return get_active_skill_categories()
