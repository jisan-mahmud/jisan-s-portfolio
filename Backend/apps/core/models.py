from django.db import models


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class OrderedActiveModel(models.Model):
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ["order", "id"]


class SiteProfile(SingletonModel):
    full_name = models.CharField(max_length=120, default="Jisan Mahmud")
    headline = models.CharField(max_length=180, blank=True)
    roles = models.JSONField(default=list, blank=True, help_text="List of role strings for the typing animation.")
    intro_skills = models.JSONField(default=list, blank=True, help_text="Skill pills shown in the hero section.")
    bio_short = models.TextField(blank=True)
    bio_long = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True)
    avatar_url = models.CharField(max_length=500, blank=True)
    resume_url = models.URLField(blank=True)
    location = models.CharField(max_length=180, blank=True)
    email = models.EmailField(blank=True)
    availability_text = models.CharField(max_length=180, blank=True)
    is_available = models.BooleanField(default=True)
    codeforces_handle = models.CharField(max_length=100, blank=True)
    leetcode_username = models.CharField(max_length=100, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site profile"
        verbose_name_plural = "Site profile"

    def __str__(self):
        return self.full_name

    @property
    def avatar_src(self):
        if self.avatar:
            return self.avatar.url
        return self.avatar_url


class SocialLink(OrderedActiveModel):
    label = models.CharField(max_length=60)
    url = models.CharField(max_length=500)
    icon_key = models.CharField(max_length=40, default="link")

    def __str__(self):
        return self.label
