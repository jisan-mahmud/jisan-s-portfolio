from apps.core.models import OrderedActiveModel
from django.db import models


class Highlight(models.Model):
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ["order", "id"]

    def __str__(self):
        return self.text[:60]


class Experience(OrderedActiveModel):
    title = models.CharField(max_length=120)
    company = models.CharField(max_length=120)
    stack = models.CharField(max_length=180, blank=True)
    period = models.CharField(max_length=120, blank=True)
    employment_type = models.CharField(max_length=60, blank=True)
    location = models.CharField(max_length=180, blank=True)

    def __str__(self):
        return f"{self.title} @ {self.company}"


class ExperienceHighlight(Highlight):
    experience = models.ForeignKey(Experience, related_name="highlights", on_delete=models.CASCADE)


class Education(OrderedActiveModel):
    STATUS_CHOICES = [
        ("Ongoing", "Ongoing"),
        ("Completed", "Completed"),
    ]

    degree = models.CharField(max_length=180)
    institution = models.CharField(max_length=180)
    period = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Completed")
    location = models.CharField(max_length=180, blank=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class EducationHighlight(Highlight):
    education = models.ForeignKey(Education, related_name="highlights", on_delete=models.CASCADE)
