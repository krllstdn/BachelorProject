from django.urls import path
from .views import ModelList, ModelRetrieveUpdateDestroy

urlpatterns = [
    path("", ModelList.as_view()),
    path(
        "<int:pk>/",
        ModelRetrieveUpdateDestroy.as_view(),
        name="model-retrieve-update-destroy",
    ),
]
