from django.contrib import admin

from .models import AboutParagraph, AboutStat, Interest


@admin.register(AboutStat)
class AboutStatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "icon_key", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("label", "value")


@admin.register(AboutParagraph)
class AboutParagraphAdmin(admin.ModelAdmin):
    list_display = ("__str__", "expanded_only", "order", "is_active")
    list_editable = ("expanded_only", "order", "is_active")
    search_fields = ("text",)


@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ("label", "color", "order", "is_active")
    list_editable = ("color", "order", "is_active")
    list_filter = ("color", "is_active")
    search_fields = ("label",)
