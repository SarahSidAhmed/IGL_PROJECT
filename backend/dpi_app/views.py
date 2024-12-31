from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView, UpdateAPIView
from .models import Dpi, Staff, Prescription, Consultation, Medicine, BiologicalExam, RadiologicalExam
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from .pagination import *

#this will be used so that when the backend needs to retrived the infos of the person
class GetStaffByIdAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    lookup_field = 'id'

#this will be used in the dropdown to assign a doctor
class GetAllDoctorsStaffAPIView(APIView):
    @swagger_auto_schema( responses={200: StaffSerializer(many=True)} )
    def get(self, request, *args, **kwargs):
        doctors = Staff.objects.filter(role="Doctor")
        serializer = StaffSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
  
#this is for the login of the staff
class StaffLoginAPIView(APIView):
    @swagger_auto_schema(request_body=StaffLoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer_class = StaffLoginSerializer(data=request.data)
        if serializer_class.is_valid():
            staff = Staff.objects.get(email=serializer_class.validated_data["email"])

            # Generate JWT tokens
            refresh = RefreshToken.for_user(staff)
            staff_serialized = StaffSerializer(staff)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "staff": staff_serialized.data
            }, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


#this is for the login of the patient with the QR code
class PatientLoginView(APIView):
    @swagger_auto_schema(request_body=PatientLoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer_class = PatientLoginSerializer(data=request.data)
        if serializer_class.is_valid():
            patient = Dpi.objects.get(id=serializer_class.validated_data["id"])

            # Generate JWT tokens
            refresh = RefreshToken.for_user(patient)
            patient_serialized = DpiSerializer(patient)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "dpi": patient_serialized.data
            }, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

class CreatePrescriptionAPIView(CreateAPIView):
    serializer_class = PrescriptionSerializer

class CreateConsultationAPIView(CreateAPIView):
    serializer_class = ConsultationSerializer

class UpdateConsultationAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    lookup_field = 'id'


class AddMedicineAPIView(CreateAPIView):
    serializer_class = MedicineSerializer

  
class DeleteUpdateMedicineAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    lookup_field = 'id'

#not sure yet

class GetAllBiologicalExamsByConsultationId(ListCreateAPIView):
    queryset = BiologicalExam.objects.all()
    serializer_class = BiologicalExamSerializer

class GetAllRadiologicalExamsByConsultationId(ListCreateAPIView):
    queryset = RadiologicalExam.objects.all()
    serializer_class = RadiologicalExamSerializer

class GetAllMedicinesByPrescriptionId(APIView):
    @swagger_auto_schema(responses={200: MedicineSerializer(many=True)})
    def get(self, request, prescription_id, *args, **kwargs):
        medicines = Medicine.objects.filter(prescription__id=prescription_id)
        if not medicines.exists():
            return Response(
                {"detail": "No medicines found for the given prescription ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#getting all the consultations of a patient to display them
class GetAllConsultationsByDpiId(APIView):
    pagination_class = ConsultationPagination

    @swagger_auto_schema(responses={200: ConsultationSerializer(many=True)})
    def get(self, request, dpi_id, *args, **kwargs):
        consultations = Consultation.objects.filter(dpi_id=dpi_id).select_related('doctor')
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DpiCreateView(CreateAPIView):
    serializer_class = DpiCreateSerializer

class DpiSearchBySSNView(ListAPIView):
    serializer_class = DpiSerializer
    pagination_class = DpiPagination

    def get_queryset(self):
        queryset = Dpi.objects.all().select_related('doctor').order_by('-id')
        
        ssn_prefix = self.request.query_params.get('ssn_prefix')
        
        if ssn_prefix:
            queryset = queryset.filter(social_security_number__startswith=ssn_prefix)
        
        return queryset


class DpiDetailByIdView(RetrieveUpdateDestroyAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiCreateSerializer
    lookup_field = 'id'


class ValidatePrescriptionView(APIView):
    @swagger_auto_schema(request_body=PrescriptionValidationSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PrescriptionValidationSerializer(data=request.data)
        if serializer.is_valid():
            prescription_id = serializer.validated_data["prescription"]
            try:
                prescription = Prescription.objects.get(id=prescription_id)
                if (prescription.validated):
                    return Response({"error": "Prescription already validated."}, status=status.HTTP_400_BAD_REQUEST)
                prescription.validated = True
                prescription.save()
                return Response({"message": "Prescription Validated"}, status=status.HTTP_200_OK)
            except Prescription.DoesNotExist:
                return Response({"error": "Prescription not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BiologicalExamCreateView(CreateAPIView):
    queryset = BiologicalExam.objects.all()
    serializer_class = BiologicalExamCreateSerializer
  
class BiologicalExamUpdateView(UpdateAPIView):
    queryset = BiologicalExam.objects.all()
    serializer_class = BiologicalExamUpdateSerializer
    
class NursingRecordCreateView(CreateAPIView):
    queryset = NursingRecord.objects.all()
    serializer_class = NursingRecordCreateSerializer
    
class NursingRecordUpdateView(UpdateAPIView):
    queryset = NursingRecord.objects.all()
    serializer_class = NursingRecordUpdateSerializer

class RadiologicalExamCreateView(CreateAPIView):
    queryset = RadiologicalExam.objects.all()
    serializer_class = RadiologicalExamCreateSerializer

class RadiologicalExamUpdateView(UpdateAPIView):
    queryset = RadiologicalExam.objects.all()
    serializer_class = RadiologicalExamUpdateSerializer

class BiologicalExamListView(ListAPIView):
    serializer_class = BiologicalExamListSerializer
    pagination_class = ExamsRecordsPagination
    def get_queryset(self):
        ssn_prefix = self.kwargs.get('ssn_prefix', None)
        queryset = BiologicalExam.objects.filter(lab_technician__isnull=True).select_related('consultation', 'consultation__dpi')
        if ssn_prefix:
           queryset = queryset.filter(consultation__dpi__social_security_number__startswith=ssn_prefix)
        return queryset

class RadiologicalExamListView(ListAPIView):
    serializer_class = RadiologicalExamListSerializer
    pagination_class = ExamsRecordsPagination
    def get_queryset(self):
        ssn_prefix = self.kwargs.get('ssn_prefix', None)
        queryset = RadiologicalExam.objects.filter(radiologist__isnull=True).select_related('consultation', 'consultation__dpi')
        if ssn_prefix:
           queryset = queryset.filter(consultation__dpi__social_security_number__startswith=ssn_prefix)
        return queryset

class NursingRecordListView(ListAPIView):
    serializer_class = NursingRecordListSerializer
    pagination_class = ExamsRecordsPagination
    
    def get_queryset(self):
        ssn_prefix = self.kwargs.get('ssn_prefix', None)
        queryset = NursingRecord.objects.filter(nurse__isnull=True).select_related('consultation', 'consultation__dpi')
        if ssn_prefix:
           queryset = queryset.filter(consultation__dpi__social_security_number__startswith=ssn_prefix)
        return queryset


class UnifiedExamRecordView(APIView):
    @swagger_auto_schema(responses={200: UnifiedExamRecordSerializer(many=True)})
    def get(self, request, id, *args, **kwargs):
        try:
            dpi = Dpi.objects.get(pk=id)
        except Dpi.DoesNotExist:
            return Response({"error": "Dpi not found."}, status=status.HTTP_404_NOT_FOUND)

        consultations = Consultation.objects.filter(dpi=dpi)

        biological_exams = BiologicalExam.objects.filter(
            consultation__in=consultations,
            lab_technician_id__isnull=False
        ).prefetch_related('biologicalexamparam_set').select_related('lab_technician')

        radiological_exams = RadiologicalExam.objects.filter(
            consultation__in=consultations,
            radiologist_id__isnull=False
        ).select_related('radiologist')

        unified_records = []

        for exam in biological_exams:
            parameters = list(
                exam.biologicalexamparam_set.values('id', 'param_name', 'value')
            )
            unified_records.append({
                'id': exam.id,
                'type': 'biological-exam',
                'exam_name': exam.exam_name,
                'result': exam.result,
                'parameters': parameters,
                'exam_date': exam.exam_date,
                'staff': {
                    'id': exam.lab_technician.id,
                    'name': exam.lab_technician.name
                }
            })

        for exam in radiological_exams:
            unified_records.append({
                'id': exam.id,
                'type': 'radiological-exam',
                'exam_name': exam.exam_name,
                'result': exam.result,
                'image': exam.image,
                'exam_date': exam.exam_date,
                'staff': {
                    'id': exam.radiologist.id,
                    'name': exam.radiologist.name
                }
            })

        unified_records.sort(key=lambda x: x['exam_date'], reverse=True)

        serializer = UnifiedExamRecordSerializer(unified_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
