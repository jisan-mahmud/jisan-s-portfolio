from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from .models import Education, Experience


class ExperienceSerializer(serializers.ModelSerializer):
    highlights = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "title",
            "company",
            "stack",
            "period",
            "employment_type",
            "location",
            "highlights",
            "order",
        ]

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_highlights(self, obj):
        return [highlight.text for highlight in obj.highlights.all()]


class EducationSerializer(serializers.ModelSerializer):
    highlights = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = ["id", "degree", "institution", "period", "status", "location", "highlights", "order"]

    def get_highlights(self, obj):
        return [highlight.text for highlight in obj.highlights.all()]
