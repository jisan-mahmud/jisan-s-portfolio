from django.db.models.signals import post_delete, post_save

from apps.core.cache import invalidate_portfolio_cache

from .models import Skill, SkillCategory

CACHE_MODELS = [SkillCategory, Skill]


def _invalidate(**kwargs):
    invalidate_portfolio_cache()


for _model in CACHE_MODELS:
    post_save.connect(_invalidate, sender=_model, dispatch_uid=f"invalidate-{_model.__name__}-save")
    post_delete.connect(_invalidate, sender=_model, dispatch_uid=f"invalidate-{_model.__name__}-delete")
