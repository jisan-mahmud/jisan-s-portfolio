from .models import Education, Experience


def get_active_experiences():
    return Experience.objects.filter(is_active=True).prefetch_related("highlights")


def get_active_education():
    return Education.objects.filter(is_active=True).prefetch_related("highlights")
