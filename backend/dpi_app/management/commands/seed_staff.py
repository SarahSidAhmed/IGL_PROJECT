from django.core.management.base import BaseCommand
from dpi_app.models import Staff
from django.utils.crypto import get_random_string
from django.utils.timezone import now


class Command(BaseCommand):
    help = "Seed the staff table"

    STAFF_ROLES = ['Doctor', 'Nurse', 'Pharmacist', 'LabTechnician', 'Radiologist', 'SuperAdmin', 'Admin']

    def add_arguments(self, parser):
        parser.add_argument(
            '--role',
            choices=self.STAFF_ROLES,
            help="Specify the role of the staff member to create. If not provided, all roles will be seeded."
        )

    def handle(self, *args, **kwargs):
        role = kwargs['role']
        
        if role:
            self._seed_single_role(role)
        else:
            self._seed_all_roles()

    def _generate_staff_data(self, role):
        """Generate staff data with randomized email and name"""
        email = f"{role.lower()}_{get_random_string(5)}@example.com"
        name = f"{role} {get_random_string(5)}"
        return {
            'role': role,
            'email': email,
            'password': "password123",
            'name': name,
            'phone': "1234567890",
            'speciality': f"{role} Speciality", # Even if the role is not Doctor, just for the sake of seeding
        }

    def _seed_single_role(self, role):
        self.stdout.write(f"Seeding one {role} data...")
        staff_data = self._generate_staff_data(role)
        staff = Staff.objects.create(**staff_data)
        self.stdout.write(self.style.SUCCESS(f"Created one {role} with email {staff_data['email']}, ID = {staff.id}"))

    def _seed_all_roles(self):
        self.stdout.write("Seeding all staff roles data...")
        for role in self.STAFF_ROLES:
            staff_data = self._generate_staff_data(role)
            staff = Staff.objects.create(**staff_data)
            self.stdout.write(f"Created {role} with email {staff_data['email']}, ID = {staff.id}")
        self.stdout.write(self.style.SUCCESS("Staff seeding completed!"))