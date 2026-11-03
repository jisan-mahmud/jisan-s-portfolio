from django.contrib import admin

from .models import Education, EducationHighlight, Experience, ExperienceHighlight


class ExperienceHighlightInline(admin.TabularInline):
    model = ExperienceHighlight
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "employment_type", "period", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "employment_type")
    search_fields = ("title", "company", "stack")
    inlines = [ExperienceHighlightInline]


class EducationHighlightInline(admin.TabularInline):
    model = EducationHighlight
    extra = 1


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "period", "status", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("status", "is_active")
    search_fields = ("degree", "institution")
    inlines = [EducationHighlightInline]
