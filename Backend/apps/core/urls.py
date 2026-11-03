from django.urls import path

from .views import HomeView, ProfileView

urlpatterns = [
    path("home/", HomeView.as_view(), name="portfolio-home"),
    path("profile/", ProfileView.as_view(), name="portfolio-profile"),
]
