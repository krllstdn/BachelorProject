from django.urls import path
from .views import ModelList

urlpatterns = [
    path("", ModelList.as_view()),
]
