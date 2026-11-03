from django.apps import AppConfig


class AboutConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.about"
    verbose_name = "About"

    def ready(self):
        from . import signals  # noqa: F401
