from rest_framework import serializers
from .models import Dpi, Consultation, BiologicalExam, RadiologicalExam, NursingRecord

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
    biological_exams = BiologicalExamSerializer(many=True, source='biologicalexam_set')
    radiological_exams = RadiologicalExamSerializer(many=True, source='radiologicalexam_set')
    nursing_records = NursingRecordSerializer(many=True, source='nursingrecord_set')

    class Meta:
        model = Consultation
        fields = '__all__'

class DpiSerializer(serializers.ModelSerializer):
    consultations = ConsultationSerializer(many=True, source='consultation_set', read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Dpi
        exclude  = ['admission_date']