from django.contrib import admin
from django.utils.html import format_html

from .models import CaseStudy, Project, ProjectFeature, Tag, Tech


class ProjectFeatureInline(admin.TabularInline):
    model = ProjectFeature
    extra = 1


class CaseStudyInline(admin.StackedInline):
    model = CaseStudy
    extra = 0
    max_num = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "year", "role", "is_featured", "is_published", "order", "image_preview")
    list_editable = ("is_featured", "is_published", "order")
    list_filter = ("is_featured", "is_published", "tags", "tech")
    search_fields = ("title", "slug", "short_desc", "description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "tech")
    inlines = [ProjectFeatureInline, CaseStudyInline]
    fieldsets = (
        ("Project", {"fields": ("title", "slug", "short_desc", "description", "year", "role")}),
        ("Links", {"fields": ("live_link", "github_link")}),
        ("Media", {"fields": ("image", "image_url")}),
        ("Publishing", {"fields": ("tags", "tech", "is_featured", "is_published", "order")}),
    )

    @admin.display(description="Image")
    def image_preview(self, obj):
        src = obj.image_src
        if not src:
            return "—"
        return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', src)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Tech)
class TechAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
