import datetime
import pytest
import logging
from django.test import TestCase
from dpi_app.models import Dpi, Staff
from dpi_app.serializers import DpiSerializer
from django.utils.timezone import now
from django.contrib.auth.hashers import check_password


# Configure logging for pytest
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@pytest.mark.django_db
def test_create_dpi(api_client):
    """
    Test creating a new DPI record and verifying it was inserted
    """
    payload = {
        "social_security_number": "999-88-7777",
        "password": "secure_password",
        "first_name": "Alice",
        "last_name": "Smith",
        "birthdate": "1990-02-02",
        "address": "456 Elm St, Springfield",
        "phone": "5559876543",
        "gender": "Female",
        "blood_type": "A-",
        "mutuelle_name": "HealthFirst",
        "mutuelle_policy_number": "POL98765432",
        "emergency_contact_name": "Bob Smith",
        "emergency_contact_phone": "5551239876",
        "emergency_contact_relationship": "Brother",
        "medical_history": "None",
        "hospital": "General Hospital",
    }

    # Create DPI
    response = api_client.post("/api/dpis/", data=payload, format="json")
    assert response.status_code == 201

    # Verify DPI was inserted
    dpi_id = response.data["id"]
    response_verify = api_client.get(f"/api/dpis/qr/{dpi_id}/")
    assert response_verify.status_code == 200
    assert response_verify.data["first_name"] == payload["first_name"]
    assert response_verify.data["last_name"] == payload["last_name"]

    # Logging statements
    logger.info("DPI record created successfully")
    logger.debug(f"DPI ID: {dpi_id}")


@pytest.mark.django_db
def test_update_dpi(api_client):
    """
    Test updating an existing DPI record and verifying the updated values
    """
    # Create a DPI record first
    payload = {
        "social_security_number": "111-22-3333",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "birthdate": "1985-05-15",
        "address": "123 Main St",
        "phone": "5555555555",
        "gender": "Male",
        "blood_type": "O+",
        "mutuelle_name": "BlueCross",
        "mutuelle_policy_number": "BC12345",
        "emergency_contact_name": "Jane Doe",
        "emergency_contact_phone": "5559876543",
        "emergency_contact_relationship": "Spouse",
        "medical_history": "None",
        "hospital": "City Hospital",
    }
    response_create = api_client.post("/api/dpis/", data=payload, format="json")
    assert response_create.status_code == 201
    dpi_id = response_create.data["id"]

    # Update DPI record
    update_payload = {"first_name": "James", "last_name": "Smith"}
    response_update = api_client.patch(f"/api/dpis/qr/{dpi_id}/", data=update_payload, format="json")
    assert response_update.status_code == 200

    # Verify updated DPI values
    response_verify = api_client.get(f"/api/dpis/qr/{dpi_id}/")
    assert response_verify.status_code == 200
    assert response_verify.data["first_name"] == update_payload["first_name"]
    assert response_verify.data["last_name"] == update_payload["last_name"]

    # Logging statements
    logger.info("DPI record updated successfully")
    logger.debug(f"DPI ID: {dpi_id}")




#real unitary tests are applied on the very base of the functions
#in validating the data and the logic of the functions
#here we're gonna test the serilizer of the DPI model

class DpiModelSerializerTestCase(TestCase):
    def setUp(self):
        # Create a staff instance to associate with the Dpi model
        self.staff = Staff.objects.create(
            role="Doctor",
            email="3abd@example.com",
            password="password123",
            name="Mahmoud Kho",
            phone="0777796966",
            speciality="General Medicine",
        )
        
        # Valid data for the Dpi model
        self.valid_data = {
            "social_security_number": "56352441434",
            "password": "password123",
            "first_name": "Mahmoud",
            "last_name": "Kho",
            "birthdate": "2004-09-06",
            "address": "Din Naadja, Alger",
            "phone": "0777796966",
            "doctor": self.staff,
            "emergency_contact_name": "Sara",
            "emergency_contact_phone": "076946321",
            "emergency_contact_relationship": "Cousin",
            "gender": "Male",
            "blood_type": "O+",
            "mutuelle_name": "Insurance Company",
            "mutuelle_policy_number": "POL123456",
            "medical_history": "None",
            "hospital": "General Hospital",
        }

        self.invalid_data = {
            "social_security_number": "",
            "password": "123",  # invalid password
            "phone": "invalid-phone",
            "doctor": None, 
            "first_name": "",
            "last_name": "",
            "birthdate": "",
            "address": "",
            "emergency_contact_name": "",
            "emergency_contact_phone": "",
            "emergency_contact_relationship": "",
            "gender": "",
            "blood_type": "",
            "mutuelle_name": "",
            "mutuelle_policy_number": "",
            "hospital": "",
        }

    def test_dpi_model_save_hashed_password(self):
        # Test password hashing
        dpi = Dpi.objects.create(**self.valid_data)
        self.assertTrue(
            check_password(self.valid_data["password"], dpi.password),
            "The password was not hashed correctly when saving the Dpi model."
        )

    def test_dpi_model_string_representation(self):
        # Create a dpi and test the string representation
        dpi = Dpi.objects.create(**self.valid_data)
        self.assertEqual(
            str(dpi),
            f'{self.valid_data["first_name"]} {self.valid_data["last_name"]}',
            "The string representation of the Dpi model does not match the expected format."
        )

    def test_serializer_with_valid_data(self):
        # Test with valid data
        serializer = DpiSerializer(data=self.valid_data)
        serializer.is_valid(raise_exception=True)
        self.assertTrue(
           serializer.is_valid(),
            "The serializer should be valid with the provided valid data."
        ) 
        validated_data = serializer.validated_data
        
        self.assertEqual(
            validated_data["social_security_number"], 
            self.valid_data["social_security_number"],
            "The social_security_number in the validated data is incorrect."
        )
        self.assertEqual(
            validated_data["first_name"], 
            self.valid_data["first_name"],
            "The first_name in the validated data is incorrect."
        )
        self.assertEqual(
            validated_data["last_name"], 
            self.valid_data["last_name"],
            "The last_name in the validated data is incorrect."
        )
        self.assertNotIn(
            "password", serializer.validated_data,
            "The password should not be exposed in the validated data."
        )

    def test_serializer_with_invalid_data(self):

        # Create a serializer instance with invalid data
        serializer = DpiSerializer(data=self.invalid_data)

        # Check if the serializer is invalid
        if not serializer.is_valid():
            # Log the error messages with custom messages
            logger.error(f"Serializer validation failed with errors: {serializer.errors}")
        
        # Assertions
        self.assertFalse(
            serializer.is_valid(),
            f"Serializer should be invalid with the provided invalid data. Errors: {serializer.errors}"
        )
        
        # You can also print out the errors
        for field, errors in serializer.errors.items():
            for error in errors:
                print(f"Expected error in field '{field}': {error}")