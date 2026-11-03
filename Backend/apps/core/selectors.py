from .models import SiteProfile, SocialLink


def get_site_profile():
    return SiteProfile.load()


def get_active_social_links():
    return SocialLink.objects.filter(is_active=True)
