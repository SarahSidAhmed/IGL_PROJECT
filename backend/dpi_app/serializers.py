from rest_framework import serializers
from .models import *
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


class PatientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            patient = Dpi.objects.get(email=email)
        except Dpi.DoesNotExist:
            raise serializers.ValidationError("No Patient with that email. Check again!")

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
    prescription = PrescriptionSerializer(read_only=True)

    #only doctors can add consultations
    def validate_doctor(self, value):
        if value.role != "Doctor":
            raise serializers.ValidationError("The assigned staff must have the role 'Doctor'.")
        return value

    class Meta:
        model = Consultation
        fields = '__all__'
        read_only_fields = ['consultation_date']
   
class StaffReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'name']
    
class DpiSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    doctor = StaffReadSerializer(read_only=True)

    class Meta:
        model = Dpi
        fields = '__all__'
        read_only_fields = ['admission_date']

class DpiCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpi
        fields = '__all__'
        read_only_fields = ['admission_date']
        
class PrescriptionValidationSerializer(serializers.Serializer):
    prescription = serializers.IntegerField(required=True)

# Serializers for Biological Exam Parameters
class BiologicalExamParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiologicalExamParam
        fields = ['id', 'param_name']


class BiologicalExamParamUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = BiologicalExamParam
        fields = ['id', 'value']


# Serializers for Biological Exam
class BiologicalExamCreateSerializer(serializers.ModelSerializer):
    parameters = BiologicalExamParamSerializer(many=True, write_only=True)

    class Meta:
        model = BiologicalExam
        fields = ['id', 'consultation', 'exam_name', 'parameters']

    def create(self, validated_data):
        parameters_data = validated_data.pop('parameters', [])
        biological_exam = BiologicalExam.objects.create(**validated_data)

        for param_data in parameters_data:
            BiologicalExamParam.objects.create(biological_exam=biological_exam, **param_data)

        return biological_exam


class BiologicalExamUpdateSerializer(serializers.ModelSerializer):
    parameters = BiologicalExamParamUpdateSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = BiologicalExam
        fields = ['result', 'exam_date', 'lab_technician', 'parameters']

    def update(self, instance, validated_data):
        parameters_data = validated_data.pop('parameters', [])
        instance.result = validated_data.get('result', instance.result)
        instance.exam_date = validated_data.get('exam_date', instance.exam_date)
        instance.lab_technician = validated_data.get('lab_technician', instance.lab_technician)

        # Update parameter values
        for param_data in parameters_data:
            try:
                param = BiologicalExamParam.objects.get(id=param_data['id'], biological_exam=instance)
                param.value = param_data['value']
                param.save()
            except BiologicalExamParam.DoesNotExist:
                raise serializers.ValidationError(f"Parameter with ID {param_data['id']} does not exist.")

        return instance


# Serializers for Radiological Exam
class RadiologicalExamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologicalExam
        fields = ['id', 'consultation', 'exam_name']


class RadiologicalExamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologicalExam
        fields = ['image', 'exam_date','radiologist', 'result']

    def update(self, instance, validated_data):
        
        instance.exam_date = validated_data.get('exam_date', instance.exam_date)
        instance.result = validated_data.get('result', instance.result)
        instance.image = validated_data.get('image', instance.image)
        instance.radiologist = validated_data.get('radiologist', instance.radiologist)
        instance.save()

        return instance


# Serializers for Nursing Record
class NursingRecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursingRecord
        fields = ['id', 'consultation', 'care_name', 'record_date']


class NursingRecordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursingRecord
        fields = ['patient_observation', 'record_date', 'nurse']
        def update(self, instance, validated_data):
         instance.record_date = validated_data.get('record_date', instance.record_date)
         instance.patient_observation = validated_data.get('patient_observation', instance.patient_observation)
         instance.nurse = validated_data.get('nurse', instance.nurse)
         instance.save()
         return instance

