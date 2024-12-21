from rest_framework import serializers
from .models import Dpi, Consultation, BiologicalExam, RadiologicalExam, NursingRecord, Staff
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

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
        read_only_fields = ['email', 'name', 'phone', 'role', 'speciality']
        write_only_fields = ['password']

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

    class Meta:
        model = Consultation
        fields = '__all__'

class DpiSerializer(serializers.ModelSerializer):
    consultations = ConsultationSerializer(many=True, source='consultation_set', read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Dpi
        exclude  = ['admission_date']