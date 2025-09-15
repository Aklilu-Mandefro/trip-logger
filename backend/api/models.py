from django.db import models

# Define the models for trip details and logs
class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_used = models.FloatField()

    def __str__(self):
        return f"Trip from {self.pickup_location} to {self.dropoff_location}"
