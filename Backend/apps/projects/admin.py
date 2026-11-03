from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, StackedInline, TabularInline

from .models import CaseStudy, Project, ProjectFeature, Tag, Tech


class ProjectFeatureInline(TabularInline):
    model = ProjectFeature
    fields = ("text", "order")
    ordering = ("order", "id")
    extra = 0


class CaseStudyInline(StackedInline):
    model = CaseStudy
    extra = 0
    max_num = 1


@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ("title", "slug", "year", "role", "is_featured", "is_published", "order", "image_preview")
    list_editable = ("is_featured", "is_published", "order")
    list_filter = ("is_published", "is_featured", "tags", "tech")
    search_fields = ("title", "slug", "short_desc", "description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "tech")
    inlines = [ProjectFeatureInline, CaseStudyInline]
    date_hierarchy = "created_at"
    list_per_page = 25
    fieldsets = (
        (
            "Project details",
            {
                "fields": (
                    "title",
                    "slug",
                    "short_desc",
                    "description",
                    "year",
                    "role",
                )
            },
        ),
        ("Project links", {"fields": ("live_link", "github_link")}),
        ("Project image", {"fields": ("image", "image_url")}),
        (
            "Publishing and display",
            {
                "fields": (
                    "tags",
                    "tech",
                    "is_featured",
                    "is_published",
                    "order",
                )
            },
        ),
    )

    @admin.display(description="Image")
    def image_preview(self, obj):
        src = obj.image_src
        if not src:
            return "—"
        return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', src)


@admin.register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    list_per_page = 25


@admin.register(Tech)
class TechAdmin(ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    list_per_page = 25
