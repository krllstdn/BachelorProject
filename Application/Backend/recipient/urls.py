from django.urls import path
from .views import RecipientList

urlpatterns = [
    path("", RecipientList.as_view()),
]
