import pytest
import logging

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
