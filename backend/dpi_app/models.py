from django.db import models
from django.utils import timezone

class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name


class Dpi(models.Model):
    id = models.AutoField(primary_key=True)
    social_security_number = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthdate = models.DateField()
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL, null=True)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)
    emergency_contact_relationship = models.CharField(max_length=30)
    gender = models.CharField(max_length=6)
    blood_type = models.CharField(max_length=3)
    mutuelle_name = models.CharField(max_length=255)
    mutuelle_policy_number = models.CharField(max_length=100)
    medical_history = models.TextField()
    admission_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Staff(models.Model):
    id = models.AutoField(primary_key=True)
    ROLE_CHOICES = [
        ('Nurse', 'Nurse'),
        ('Pharmacist', 'Pharmacist'),
        ('LabTechnician', 'Lab Technician'),
        ('Radiologist', 'Radiologist')
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    speciality = models.CharField(max_length=100)
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name


class Consultation(models.Model):
    id = models.AutoField(primary_key=True)
    dpi = models.ForeignKey(Dpi, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    consultation_summary = models.TextField()
    examination_required = models.TextField()
    consultation_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Consultation for {self.dpi}'


class Prescription(models.Model):
    id = models.AutoField(primary_key=True)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    prescription_date = models.DateField(default=timezone.now)
    validated = models.BooleanField(default=False)
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return f'Prescription for {self.consultation}'


class Medicine(models.Model):
    id = models.AutoField(primary_key=True)
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    frequency = models.CharField(max_length=50)

    def __str__(self):
        return self.medication_name


class BiologicalExam(models.Model):
    id = models.AutoField(primary_key=True)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    lab_technician = models.ForeignKey(Staff, on_delete=models.CASCADE)
    exam_name = models.CharField(max_length=100)
    result = models.TextField()
    has_graph = models.BooleanField(default=False)
    exam_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.exam_name


class BiologicalExamParam(models.Model):
    id = models.AutoField(primary_key=True)
    biological_exam = models.ForeignKey(BiologicalExam, on_delete=models.CASCADE)
    param_name = models.CharField(max_length=100)
    before_treatment_value = models.FloatField()
    after_treatment_value = models.FloatField()
    unit = models.CharField(max_length=20)

    def __str__(self):
        return self.param_name


class RadiologicalExam(models.Model):
    id = models.AutoField(primary_key=True)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    radiologist = models.ForeignKey(Staff, on_delete=models.CASCADE)
    exam_name = models.TextField()
    image_url = models.TextField()
    result = models.TextField()
    exam_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.exam_name


class NursingRecord(models.Model):
    id = models.AutoField(primary_key=True)
    dpi = models.ForeignKey(Dpi, on_delete=models.CASCADE)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    nurse = models.ForeignKey(Staff, on_delete=models.CASCADE)
    care_name = models.TextField()
    patient_observation = models.TextField()
    record_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Nursing record for DPI {self.dpi}'
