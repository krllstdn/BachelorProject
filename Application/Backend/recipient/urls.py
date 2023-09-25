from django.urls import path
from .views import RecipientList, RecipientRetrieveUpdateDestroy, CreateRecipient

urlpatterns = [
    path("", RecipientList.as_view()),
    path("create/", CreateRecipient.as_view()),
    path("<int:pk>/", RecipientRetrieveUpdateDestroy.as_view()),
]
