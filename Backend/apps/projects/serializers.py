from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from .models import CaseStudy, Project


class ProjectListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    tech = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "slug",
            "title",
            "short_desc",
            "description",
            "image",
            "live_link",
            "github_link",
            "tags",
            "tech",
            "year",
            "role",
            "is_featured",
            "order",
        ]

    @extend_schema_field(serializers.CharField)
    def get_image(self, obj):
        return obj.image_src or ""

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_tech(self, obj):
        return [tech.name for tech in obj.tech.all()]


class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = ["problem", "solution", "outcome"]


class ProjectDetailSerializer(ProjectListSerializer):
    features = serializers.SerializerMethodField()
    case_study = CaseStudySerializer(read_only=True)

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + ["features", "case_study"]

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_features(self, obj):
        return [feature.text for feature in obj.features.all()]
