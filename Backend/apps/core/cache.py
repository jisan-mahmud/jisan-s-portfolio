from django.conf import settings
from django.core.cache import cache
from django.db import transaction

HOME_CACHE_KEY = "portfolio:home"


def get_home_cache_key():
    version = getattr(settings, "PORTFOLIO_CACHE_VERSION", "1")
    return f"{HOME_CACHE_KEY}:v{version}"


def invalidate_portfolio_cache():
    key = get_home_cache_key()
    cache.delete(key)
    transaction.on_commit(lambda: cache.delete(key))
