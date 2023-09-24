from django.urls import path
from .views import PairList

urlpatterns = [
    path("", PairList.as_view()),
]
