from datetime import timezone
from django.core.management.base import BaseCommand
from dpi_app.models import Doctor, Staff
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = "Add a doctor to the database"

    def handle(self, *args, **kwargs):
        doctor = Staff.objects.create(
            role="Doctor",
            email="staff@example.com",
            password=("password123"),
            name="Dr. John Doe",
            phone="1234567890",
            speciality="Cardiologist",
        )
        self.stdout.write(f"Doctor created with ID: {doctor.id}")
 