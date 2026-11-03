from django.contrib import admin
from django.urls import reverse

from apps.core.models import SiteProfile
from apps.projects.models import Project
from apps.resume.models import Education, Experience
from apps.skills.models import SkillCategory


def dashboard_callback(request, context):
    stats = (
        ("Published projects", Project, Project.objects.filter(is_published=True).count),
        ("Draft projects", Project, Project.objects.filter(is_published=False).count),
        (
            "Experience entries",
            Experience,
            Experience.objects.filter(is_active=True).count,
        ),
        ("Education entries", Education, Education.objects.filter(is_active=True).count),
        (
            "Skill categories",
            SkillCategory,
            SkillCategory.objects.filter(is_active=True).count,
        ),
    )
    context["dashboard_stats"] = [
        {"label": label, "value": count()}
        for label, model, count in stats
        if _has_view_permission(request, model)
    ]

    quick_links = (
        ("Site profile", "core", "siteprofile", SiteProfile),
        ("Projects", "projects", "project", Project),
        ("Experience", "resume", "experience", Experience),
        ("Education", "resume", "education", Education),
        ("Skill categories", "skills", "skillcategory", SkillCategory),
    )
    context["dashboard_links"] = [
        {
            "label": label,
            "url": reverse(f"admin:{app_label}_{model_name}_changelist"),
        }
        for label, app_label, model_name, model in quick_links
        if _has_view_permission(request, model)
    ]
    return context


def _has_view_permission(request, model):
    model_admin = admin.site._registry.get(model)
    return model_admin is not None and model_admin.has_view_or_change_permission(request)
