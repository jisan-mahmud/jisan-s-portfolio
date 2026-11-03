from django.apps import AppConfig


class SkillsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.skills"
    verbose_name = "Skills"

    def ready(self):
        from . import signals  # noqa: F401
