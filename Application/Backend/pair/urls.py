from django.urls import path
from .views import PairList, PairRetrieveUpdateDestroy, GetDetailedPair

urlpatterns = [
    path("", PairList.as_view()),
    path(
        "<int:pk>/",
        PairRetrieveUpdateDestroy.as_view(),
        name="pair-retrieve-update-destroy",
    ),
    path("detail/<int:pk>/", GetDetailedPair.as_view(), name="pair-detail"),
]
