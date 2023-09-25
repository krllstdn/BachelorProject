from django.urls import path
from .views import PairList, PairRetrieveUpdateDestroy

urlpatterns = [
    path("", PairList.as_view()),
    path(
        "<int:pk>/",
        PairRetrieveUpdateDestroy.as_view(),
        name="pair-retrieve-update-destroy",
    ),
]
