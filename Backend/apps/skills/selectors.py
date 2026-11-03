from django.db.models import Prefetch

from .models import Skill, SkillCategory


def get_active_skill_categories():
    return SkillCategory.objects.filter(is_active=True).prefetch_related(
        Prefetch("skills", queryset=Skill.objects.filter(is_active=True), to_attr="active_skills")
    )
