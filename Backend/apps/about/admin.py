from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import AboutParagraph, AboutStat, Interest


@admin.register(AboutStat)
class AboutStatAdmin(ModelAdmin):
    list_display = ("label", "value", "icon_key", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("label", "value")
    list_per_page = 25


@admin.register(AboutParagraph)
class AboutParagraphAdmin(ModelAdmin):
    list_display = ("__str__", "expanded_only", "order", "is_active")
    list_editable = ("expanded_only", "order", "is_active")
    list_filter = ("expanded_only", "is_active")
    search_fields = ("text",)
    list_per_page = 25


@admin.register(Interest)
class InterestAdmin(ModelAdmin):
    list_display = ("label", "color", "order", "is_active")
    list_editable = ("color", "order", "is_active")
    list_filter = ("color", "is_active")
    search_fields = ("label",)
    list_per_page = 25
