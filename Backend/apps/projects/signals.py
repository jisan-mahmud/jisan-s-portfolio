from django.db.models.signals import m2m_changed, post_delete, post_save

from apps.core.cache import invalidate_portfolio_cache

from .models import CaseStudy, Project, ProjectFeature, Tag, Tech

CACHE_MODELS = [Project, ProjectFeature, CaseStudy, Tag, Tech]


def _invalidate(**kwargs):
    invalidate_portfolio_cache()


for _model in CACHE_MODELS:
    post_save.connect(_invalidate, sender=_model, dispatch_uid=f"invalidate-{_model.__name__}-save")
    post_delete.connect(_invalidate, sender=_model, dispatch_uid=f"invalidate-{_model.__name__}-delete")

m2m_changed.connect(
    _invalidate,
    sender=Project.tags.through,
    dispatch_uid="invalidate-Project-tags-m2m",
)
m2m_changed.connect(
    _invalidate,
    sender=Project.tech.through,
    dispatch_uid="invalidate-Project-tech-m2m",
)
