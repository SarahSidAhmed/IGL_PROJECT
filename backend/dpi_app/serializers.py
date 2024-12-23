from rest_framework import serializers
from .models import Dpi, Consultation, BiologicalExam, RadiologicalExam, NursingRecord, Staff, Medicine, Prescription
from django.contrib.auth.hashers import check_password

#login for staff
class StaffLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    id = serializers.IntegerField(read_only=True)   


    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            staff = Staff.objects.get(email=email)
        except Staff.DoesNotExist:
            raise serializers.ValidationError("No Staff with that email. Check again!")

        if not check_password(password, staff.password):
            raise serializers.ValidationError("Incorrect password. Check again!")

        data["id"] = staff.id
        return data

#login for patient with SSN
class PatientSSNLoginSerializer(serializers.Serializer):
    SSN = serializers.CharField()
    password = serializers.CharField(write_only=True, required=True)
    id = serializers.IntegerField(read_only=True)

    def validate(self, data):
        SSN = data.get("email")
        password = data.get("password")

        try:
            patient = Dpi.objects.get(social_security_number=SSN)
        except patient.DoesNotExist:
            raise serializers.ValidationError("No DPI with that SSN. Check again!")

        if not check_password(password, patient.password):
            raise serializers.ValidationError("Incorrect password. Check again!")

        data["id"] = patient.id
        return data

#login for patient with QR Code = ID
class PatientQRLoginSerializer(serializers.Serializer):
    id = serializers.IntegerField() #you should get it from the QR Scan
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        id = data.get("id")
        password = data.get("password")

        try:
            patient = Dpi.objects.get(id=id)
        except patient.DoesNotExist:
            raise serializers.ValidationError("No DPI with that ID. Check again!")

        if not check_password(password, patient.password):
            raise serializers.ValidationError("Incorrect password. Check again!")

        data["id"] = patient.id
        return data  
    
#this api is for adding just one medicine at a time
class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'prescription', 'medication_name', 'dosage', 'duration', 'frequency']
    #only doctors can add medicines
    def validate_doctor(self, value):
        if value.role != "Doctor":
            raise serializers.ValidationError("The assigned staff must have the role 'Doctor'.")
        return value


class PrescriptionSerializer(serializers.ModelSerializer):
    medicines = MedicineSerializer(many=True, read_only=True)

    class Meta:
        model = Prescription
        fields = ['id', 'consultation', 'validated', 'prescription_date', 'medicines']

    #only doctors can put an ordonnance
    def validate_doctor(self, value):
        if value.role != "Doctor":
            raise serializers.ValidationError("The assigned staff must have the role 'Doctor'.")
        return value

class StaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Staff
        fields = '__all__'
        

class BiologicalExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiologicalExam
        fields = '__all__'


class RadiologicalExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologicalExam
        fields = '__all__'

class NursingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursingRecord
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    biological_exams = BiologicalExamSerializer(many=True, source='biologicalexam_set', read_only=True)
    radiological_exams = RadiologicalExamSerializer(many=True, source='radiologicalexam_set', read_only=True)
    nursing_records = NursingRecordSerializer(many=True, source='nursingrecord_set', read_only=True)
    prescriptions = PrescriptionSerializer(many=True, source='prescription_set', read_only=True)

    #only doctors can add consultations
    def validate_doctor(self, value):
        if value.role != "Doctor":
            raise serializers.ValidationError("The assigned staff must have the role 'Doctor'.")
        return value

    class Meta:
        model = Consultation
        fields = '__all__'
        read_only_fields = ['consultation_date']

class DpiSerializer(serializers.ModelSerializer):
    consultations = ConsultationSerializer(many=True, source='consultation_set', read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Dpi
        fields = '__all__'
        read_only_fields = ['admission_date']
        
class PrescriptionValidationSerializer(serializers.Serializer):
    prescription = serializers.IntegerField(required=True)