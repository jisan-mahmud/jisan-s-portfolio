from apps.core.models import OrderedActiveModel
from django.db import models


class AboutStat(OrderedActiveModel):
    label = models.CharField(max_length=60)
    value = models.CharField(max_length=120)
    icon_key = models.CharField(max_length=40, default="code")

    def __str__(self):
        return f"{self.label}: {self.value}"


class AboutParagraph(OrderedActiveModel):
    text = models.TextField()
    expanded_only = models.BooleanField(default=False, help_text="Only show after the user clicks Read more.")

    def __str__(self):
        return self.text[:60]


class Interest(OrderedActiveModel):
    COLOR_CHOICES = [
        ("blue", "Blue"),
        ("purple", "Purple"),
        ("orange", "Orange"),
        ("cyan", "Cyan"),
        ("green", "Green"),
        ("red", "Red"),
        ("yellow", "Yellow"),
    ]

    label = models.CharField(max_length=80)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default="green")

    def __str__(self):
        return self.label
