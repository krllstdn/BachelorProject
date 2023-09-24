from django.urls import path
from .views import PredictionList

urlpatterns = [
    path("", PredictionList.as_view()),
]
