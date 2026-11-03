from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Skill, SkillCategory


class SkillInline(TabularInline):
    model = Skill
    fields = ("name", "icon_key", "icon_url", "order", "is_active")
    ordering = ("order", "id")
    extra = 0


@admin.register(SkillCategory)
class SkillCategoryAdmin(ModelAdmin):
    list_display = ("label", "color", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("label",)
    list_per_page = 25
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(ModelAdmin):
    list_display = ("name", "category", "icon_key", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "icon_key")
    list_select_related = ("category",)
    list_per_page = 25
