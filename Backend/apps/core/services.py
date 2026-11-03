from django.conf import settings
from django.core.cache import cache

from apps.about.selectors import get_about_data
from apps.about.serializers import AboutSerializer
from apps.projects.selectors import get_published_projects
from apps.projects.serializers import ProjectListSerializer
from apps.resume.selectors import get_active_education, get_active_experiences
from apps.resume.serializers import EducationSerializer, ExperienceSerializer
from apps.skills.selectors import get_active_skill_categories
from apps.skills.serializers import SkillCategorySerializer

from .cache import get_home_cache_key
from .selectors import get_site_profile
from .serializers import ProfileSerializer


def build_home_payload():
    profile = get_site_profile()
    return {
        "profile": ProfileSerializer(profile).data,
        "about": AboutSerializer(get_about_data()).data,
        "experience": ExperienceSerializer(get_active_experiences(), many=True).data,
        "education": EducationSerializer(get_active_education(), many=True).data,
        "projects": ProjectListSerializer(get_published_projects(), many=True).data,
        "technologies": SkillCategorySerializer(get_active_skill_categories(), many=True).data,
        "integrations": {
            "codeforces_handle": profile.codeforces_handle,
            "leetcode_username": profile.leetcode_username,
        },
    }


def get_home_payload():
    key = get_home_cache_key()
    payload = cache.get(key)
    if payload is None:
        payload = build_home_payload()
        cache.set(key, payload, settings.PORTFOLIO_CACHE_TTL)
    return payload
