from sys import stdout
from django.test import TestCase
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.hashers import make_password
from dpi_app.models import Staff


@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def create_Staff():
    staff = Staff.objects.create(
        role="Radiologist",
            email="someone@example.com",
            password= make_password("password123"),
            name="Mahmoud Derouiche",
            phone="1234567890",
            speciality="",
    )
    stdout.write(f"Staff created with ID: {staff.id}")
    return staff

#First unitary test for login validation credentials
@pytest.mark.django_db #allowing access to the database :-)
def test_loginSuccess(client, create_Staff):
    staff = create_Staff
    url = '/login/'
    data = {
        "email": "someone@example.com",
        "password": "password123"
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 200, f"Response: {response.data}"
    assert 'token' in response.data
    assert 'access' in response.data
    assert 'staff' in response.data
    assert response.data['staff']['email'] == staff.email
    assert response.data['staff']['role'] == staff.role
    assert response.data['staff']['name'] == staff.name
    assert response.data['staff']['phone'] == staff.phone





