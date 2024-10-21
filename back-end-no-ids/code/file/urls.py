from django.urls import path
from .views import FileViewSet
from . import views
from django.urls import path, include

from rest_framework import routers

router = routers.DefaultRouter()
router.register("", FileViewSet, basename="")
# ...


urlpatterns = [
    # path(
    #     "predict/",
    #     FileViewSet.as_view({"post": "predict"}),
    #     name="predict",
    # ),
    path(
        "create/",
        FileViewSet.as_view({"post": "create"}),
        name="create",
    ),
    path(
        "list/",
        FileViewSet.as_view({"get": "list"}),
        name="list",
    ),
    path(
        "retrieve/<str:pk>/",
        FileViewSet.as_view({"get": "retrieve"}),
        name="retrieve",
    ),
    path(
        "destroy/<str:pk>/",
        FileViewSet.as_view({"delete": "destroy"}),
        name="destroy",
    ),
    path(
        "update/<str:pk>/",
        FileViewSet.as_view({"put": "update"}),
        name="update",
    ),
    path(
        "v1/search_by_title/",
        FileViewSet.as_view({"post": "search_by_title_injectable"}),
        name="search_by_title_injectable",
    ),
    path(
        "v2/search_by_title/",
        FileViewSet.as_view({"post": "search_by_title_injectable_detected"}),
        name="search_by_title_injectable_detected",
    ),
    path(
        "v3/search_by_title/",
        FileViewSet.as_view({"get": "search_by_title"}),
        name="search_by_title",
    ),
]
