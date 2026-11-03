from django.urls import include, path

urlpatterns = [
    path("portfolio/", include("apps.core.urls")),
    path("portfolio/", include("apps.about.urls")),
    path("portfolio/", include("apps.resume.urls")),
    path("portfolio/", include("apps.skills.urls")),
    path("portfolio/", include("apps.projects.urls")),
    path("integrations/", include("apps.integrations.urls")),
]
