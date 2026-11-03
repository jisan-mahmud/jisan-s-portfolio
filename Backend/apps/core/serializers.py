from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from .models import SiteProfile, SocialLink


class SocialLinkSerializer(serializers.ModelSerializer):
    icon = serializers.CharField(source="icon_key", read_only=True)

    class Meta:
        model = SocialLink
        fields = ["id", "label", "url", "icon", "order"]


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    socials = serializers.SerializerMethodField()

    class Meta:
        model = SiteProfile
        fields = [
            "id",
            "full_name",
            "headline",
            "roles",
            "intro_skills",
            "bio_short",
            "bio_long",
            "avatar",
            "resume_url",
            "location",
            "email",
            "availability_text",
            "is_available",
            "codeforces_handle",
            "leetcode_username",
            "socials",
            "updated_at",
        ]

    @extend_schema_field(serializers.CharField)
    def get_avatar(self, obj):
        return obj.avatar_src or ""

    @extend_schema_field(SocialLinkSerializer(many=True))
    def get_socials(self, obj):
        links = SocialLink.objects.filter(is_active=True)
        return SocialLinkSerializer(links, many=True).data
