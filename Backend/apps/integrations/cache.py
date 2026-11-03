from django.conf import settings
from django.core.cache import cache
from rest_framework.exceptions import APIException


def cached(key, loader):
    cached_value = cache.get(key)
    if cached_value is not None:
        return cached_value
    try:
        result = loader()
    except APIException:
        stale = cache.get(f"{key}:stale")
        if stale is not None:
            return stale
        raise
    cache.set(key, result, settings.INTEGRATION_CACHE_TTL)
    cache.set(f"{key}:stale", result, settings.INTEGRATION_STALE_TTL)
    return result
