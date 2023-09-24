from django.urls import path
from .views import DonorList

urlpatterns = [
    path("", DonorList.as_view()),
]
