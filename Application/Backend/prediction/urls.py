from django.urls import path
from .views import PredictionList, PredictAPIView, RandomDataAPIView


urlpatterns = [
    path("", PredictionList.as_view()),
    path("predict/", PredictAPIView.as_view(), name="predict"),
    path("synthetic/", RandomDataAPIView.as_view(), name="synthetic"),
]
