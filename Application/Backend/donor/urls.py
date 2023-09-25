from django.urls import path
from .views import DonorList, CreateDonor, DonorRetrieveUpdateDestroy

urlpatterns = [
    path("", DonorList.as_view()),
    path("create/", CreateDonor.as_view()),
    path(
        "<int:pk>/",
        DonorRetrieveUpdateDestroy.as_view(),
        name="donor-retrieve-update-destroy",
    ),
]
