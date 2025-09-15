from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Trip
from .serializers import TripSerializer

# create a view to handle the trip data
class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

