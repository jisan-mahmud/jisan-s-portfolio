from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin

from .models import SiteProfile, SocialLink

admin.site.site_header = "Jisan Mahmud Portfolio"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Portfolio content"
admin.site.index_template = "admin/portfolio_index.html"


@admin.register(SiteProfile)
class SiteProfileAdmin(ModelAdmin):
    fieldsets = (
        (
            "Identity",
            {
                "fields": (
                    "full_name",
                    "headline",
                    "location",
                    "email",
                    "roles",
                    "intro_skills",
                )
            },
        ),
        ("Content", {"fields": ("bio_short", "bio_long")}),
        (
            "Profile image",
            {"fields": ("avatar_preview", "avatar", "avatar_url")},
        ),
        (
            "Availability and resume",
            {"fields": ("availability_text", "is_available", "resume_url")},
        ),
        ("Integrations", {"fields": ("codeforces_handle", "leetcode_username")}),
        ("Metadata", {"fields": ("updated_at",), "classes": ("collapse",)}),
    )
    readonly_fields = ("avatar_preview", "updated_at")

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description="Current image")
    def avatar_preview(self, obj):
        src = obj.avatar_src if obj else ""
        if not src:
            return "No image uploaded"
        return format_html('<img src="{}" style="height:96px;border-radius:8px;" />', src)


@admin.register(SocialLink)
class SocialLinkAdmin(ModelAdmin):
    list_display = ("label", "url", "icon_key", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("label", "url")
    list_per_page = 25
