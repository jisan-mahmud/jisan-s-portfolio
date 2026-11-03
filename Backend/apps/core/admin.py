from django.contrib import admin

from .models import SiteProfile, SocialLink

admin.site.site_header = "Jisan Mahmud Portfolio"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Portfolio content"


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Identity",
            {"fields": ("full_name", "headline", "roles", "intro_skills", "avatar", "avatar_url", "location", "email")},
        ),
        ("Content", {"fields": ("bio_short", "bio_long", "availability_text", "is_available", "resume_url")}),
        ("Integrations", {"fields": ("codeforces_handle", "leetcode_username")}),
        ("Metadata", {"fields": ("updated_at",), "classes": ("collapse",)}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("label", "url", "icon_key", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("label", "url")
