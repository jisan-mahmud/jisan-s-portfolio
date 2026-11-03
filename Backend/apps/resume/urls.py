from django.urls import path

from .views import EducationListView, ExperienceListView

urlpatterns = [
    path("experience/", ExperienceListView.as_view(), name="portfolio-experience"),
    path("education/", EducationListView.as_view(), name="portfolio-education"),
]
