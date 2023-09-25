from django.urls import path
from .views import RecipientList, RecipientRetrieveUpdateDestroy

urlpatterns = [
    path("", RecipientList.as_view()),
    path("<int:pk>/", RecipientRetrieveUpdateDestroy.as_view()),
]
