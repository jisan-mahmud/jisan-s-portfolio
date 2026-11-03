from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Education, EducationHighlight, Experience, ExperienceHighlight


class ExperienceHighlightInline(TabularInline):
    model = ExperienceHighlight
    fields = ("text", "order")
    ordering = ("order", "id")
    extra = 0


@admin.register(Experience)
class ExperienceAdmin(ModelAdmin):
    list_display = ("title", "company", "employment_type", "period", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "employment_type")
    search_fields = ("title", "company", "stack")
    list_per_page = 25
    inlines = [ExperienceHighlightInline]


class EducationHighlightInline(TabularInline):
    model = EducationHighlight
    fields = ("text", "order")
    ordering = ("order", "id")
    extra = 0


@admin.register(Education)
class EducationAdmin(ModelAdmin):
    list_display = ("degree", "institution", "period", "status", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("status", "is_active")
    search_fields = ("degree", "institution")
    list_per_page = 25
    inlines = [EducationHighlightInline]
