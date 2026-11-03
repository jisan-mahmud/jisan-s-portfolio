from rest_framework import serializers

from .models import Skill, SkillCategory


class SkillSerializer(serializers.ModelSerializer):
    icon = serializers.CharField(source="icon_key", read_only=True)

    class Meta:
        model = Skill
        fields = ["id", "name", "icon", "icon_url", "order"]


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = ["id", "label", "color", "skills", "order"]

    def get_skills(self, obj):
        skills = getattr(obj, "active_skills", None)
        if skills is None:
            skills = obj.skills.filter(is_active=True)
        return SkillSerializer(skills, many=True).data
