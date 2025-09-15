# set up the routing for the API
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet

router = DefaultRouter()
router.register(r'trips', TripViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include all the routes from the router
]