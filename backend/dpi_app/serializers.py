from rest_framework import serializers
from .models import Dpi, Consultation, BiologicalExam, RadiologicalExam, NursingRecord, Staff
from django.contrib.auth.hashers import check_password


class StaffLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(read_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            staff = Staff.objects.get(email=email)
        except Staff.DoesNotExist:
            raise serializers.ValidationError("No Staff with that email. Check again!")

        if not check_password(password, staff.password):
            raise serializers.ValidationError(check_password(password, staff.password))

        data["role"] = staff.role
        return data

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