from django.urls import path
from .views import PredictionList, PredictAPIView

urlpatterns = [
    path("", PredictionList.as_view()),
    path("predict/", PredictAPIView.as_view(), name="predict"),
]
