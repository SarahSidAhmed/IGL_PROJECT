from rest_framework import serializers
from .models import Dpi, Consultation, BiologicalExam, RadiologicalExam, NursingRecord, Staff, Medicine, Prescription, BiologicalExamParam
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
        fields = '__all__'
        read_only_fields = ['prescription_date', 'validated']

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


# This is used for the parameters that we'll put in a biological exam 
class BiologicalExamParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiologicalExamParam
        fields = ['param_name', 'unit']


class BiologicalExamCreateSerializer(serializers.ModelSerializer):
    parameters = BiologicalExamParamSerializer(many=True, write_only=True)

    class Meta:
        model = BiologicalExam
        fields = ['id', 'consultation', 'exam_name', 'exam_date', 'parameters']

    def create(self, validated_data):
        parameters_data = validated_data.pop('parameters', [])
        biological_exam = BiologicalExam.objects.create(**validated_data)
        
        for param_data in parameters_data:
            BiologicalExamParam.objects.create(biological_exam=biological_exam, **param_data)
        
        return biological_exam

class BiologicalExamParamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiologicalExamParam
        fields = ['id', 'value']

class BiologicalExamUpdateSerializer(serializers.ModelSerializer):
    parameters = BiologicalExamParamSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = BiologicalExam
        fields = ['result', 'lab_technician', 'parameters']

    def update(self, instance, validated_data):
        parameters_data = validated_data.pop('parameters', [])
        instance.result = validated_data.get('result', instance.result)
        instance.lab_technician = validated_data.get('lab_technician', instance.lab_technician)
        instance.save()

        if parameters_data:
           for param_data in parameters_data:
            param = BiologicalExamParam.objects.get(id=param_data['id'])
            param.value = param_data['value']
            param.save()
        
        return instance

class RadiologicalExamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologicalExam
        fields = ['consultation', 'exam_name']

class RadiologicalExamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologicalExam
        fields = ['result', 'has_graph', 'exam_date', 'radiologist']

class NursingRecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursingRecord
        fields = ['consultation', 'care_name']

class NursingRecordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursingRecord
        fields = ['record_date', 'nurse', 'patient_observation']

class ConsultationSerializer(serializers.ModelSerializer):
    biological_exams = BiologicalExamSerializer(many=True, source='biologicalexam_set', read_only=True)
    radiological_exams = RadiologicalExamSerializer(many=True, source='radiologicalexam_set', read_only=True)
    nursing_records = NursingRecordSerializer(many=True, source='nursingrecord_set', read_only=True)
    prescription = PrescriptionSerializer(source='prescription', read_only=True)

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