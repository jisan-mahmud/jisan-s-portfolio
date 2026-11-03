from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=80, unique=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tech(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=200)
    short_desc = models.TextField(blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    live_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    tags = models.ManyToManyField(Tag, related_name="projects", blank=True)
    tech = models.ManyToManyField(Tech, related_name="projects", blank=True)
    year = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=120, blank=True)
    is_featured = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        return self.image_url


class ProjectFeature(models.Model):
    project = models.ForeignKey(Project, related_name="features", on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text[:60]


class CaseStudy(models.Model):
    project = models.OneToOneField(Project, related_name="case_study", on_delete=models.CASCADE)
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    outcome = models.TextField(blank=True)

    def __str__(self):
        return f"Case study - {self.project.title}"
