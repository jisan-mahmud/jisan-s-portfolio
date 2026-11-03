from django.urls import path

from .views import CodeforcesView, LeetcodeView

urlpatterns = [
    path("codeforces/", CodeforcesView.as_view(), name="integration-codeforces"),
    path("codeforces/<str:handle>/", CodeforcesView.as_view(), name="integration-codeforces-detail"),
    path("leetcode/", LeetcodeView.as_view(), name="integration-leetcode"),
    path("leetcode/<str:username>/", LeetcodeView.as_view(), name="integration-leetcode-detail"),
]
