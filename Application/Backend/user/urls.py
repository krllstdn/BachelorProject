from django.urls import path
from .views import UserList, UserRetrieveUpdateDestroy, UserCreate

urlpatterns = [
    path("", UserList.as_view()),
    path("register/", UserCreate.as_view()),
    path("<int:pk>/", UserRetrieveUpdateDestroy.as_view()),
]
