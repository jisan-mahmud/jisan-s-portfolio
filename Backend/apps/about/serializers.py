from rest_framework import serializers

from .models import AboutParagraph, AboutStat, Interest


class AboutStatSerializer(serializers.ModelSerializer):
    icon = serializers.CharField(source="icon_key", read_only=True)

    class Meta:
        model = AboutStat
        fields = ["id", "label", "value", "icon", "order"]


class AboutParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutParagraph
        fields = ["id", "text", "expanded_only", "order"]


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ["id", "label", "color", "order"]


class AboutSerializer(serializers.Serializer):
    stats = AboutStatSerializer(many=True)
    paragraphs = AboutParagraphSerializer(many=True)
    interests = InterestSerializer(many=True)
