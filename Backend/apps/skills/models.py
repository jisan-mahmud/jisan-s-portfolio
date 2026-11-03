from apps.core.models import OrderedActiveModel
from django.db import models


class SkillCategory(OrderedActiveModel):
    label = models.CharField(max_length=80)
    color = models.CharField(max_length=30, default="green")

    class Meta(OrderedActiveModel.Meta):
        verbose_name_plural = "Skill categories"

    def __str__(self):
        return self.label


class Skill(OrderedActiveModel):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    icon_key = models.CharField(max_length=50, default="code")
    icon_url = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.name
