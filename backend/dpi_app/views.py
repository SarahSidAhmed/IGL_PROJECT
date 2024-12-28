from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView, UpdateAPIView
from .models import Dpi, Staff, Prescription, Consultation, Medicine, BiologicalExam, RadiologicalExam
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from .pagination import DpiPagination, ConsultationPagination

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
        consultations = Consultation.objects.filter(dpi_id=dpi_id)
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DpiCreateView(CreateAPIView):
    serializer_class = DpiCreateSerializer

class DpiSearchBySSNView(ListAPIView):
    serializer_class = DpiSerializer
    pagination_class = DpiPagination

    def get_queryset(self):
        ssn_prefix = self.kwargs.get('ssn_prefix', '')
        return Dpi.objects.filter(social_security_number__startswith=ssn_prefix).select_related('doctor')


class DpiDetailByIdView(RetrieveUpdateDestroyAPIView):
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
    serializer_class = BiologicalExamCreateSerializer
    def get_queryset(self):
        return BiologicalExam.objects.filter(lab_technician__isnull=True)

class RadiologicalExamListView(ListAPIView):
    serializer_class = RadiologicalExamCreateSerializer
    def get_queryset(self):
        return RadiologicalExam.objects.filter(radiologist__isnull=True)

class NursingRecordListView(ListAPIView):
    serializer_class = NursingRecordCreateSerializer
    def get_queryset(self):
        return NursingRecord.objects.filter(nurse__isnull=True)

class AllExamsForDpiView(APIView):
    def get(self, request):
        dpi_id = request.query_params.get("dpi_id")
        if not dpi_id:
            return Response({"error": "dpi_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        consultations = Consultation.objects.filter(dpi_id=dpi_id)
        if not consultations.exists():
            return Response({"error": "No consultations found for the given DPI ID."}, status=status.HTTP_404_NOT_FOUND)

        radiological_exams = RadiologicalExam.objects.filter(consultation__in=consultations, radiologist__isnull=False)
        biological_exams = BiologicalExam.objects.filter(consultation__in=consultations, lab_technician__isnull=False)

        radiological_data = [
            {"exam_name": exam.exam_name, "id": exam.id, "exam_type": "Radiological", "exam_date": exam.exam_date}
            for exam in radiological_exams
        ]
        biological_data = [
            {"exam_name": exam.exam_name, "id": exam.id, "exam_type": "Biological", "exam_date": exam.exam_date}
            for exam in biological_exams
        ]

        # Combine and sort exams by date
        combined_exams = radiological_data + biological_data
        sorted_exams = sorted(combined_exams, key=lambda x: x["exam_date"])

        return Response(sorted_exams, status=status.HTTP_200_OK)


class NursingRecordsForDpiView(APIView):
     def get(self, request):
        dpi_id = request.query_params.get("dpi_id")
        if not dpi_id:
            return Response(
                {"error": "dpi_id query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        consultations = Consultation.objects.filter(dpi_id=dpi_id)
        if not consultations.exists():
            return Response({"error": "No consultations found for the given DPI ID."}, status=status.HTTP_404_NOT_FOUND)
       
        nursing_records = NursingRecord.objects.filter(consultation__in=consultations).order_by("record_date")

        serializer = NursingRecordSerializer(nursing_records, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class AllRecordsAndExamsForConsultationView(APIView):
    def get(self, request, consultation_id):
        consultation_id = request.query_params.get("consultation_id")
        if not consultation_id:
            return Response(
                {"error": "consultation_id query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        # Check if the consultation exists
        if not Consultation.objects.filter(id=consultation_id).exists():
            return Response(
                {"error": "No consultation found for the given ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        
        nursing_records = NursingRecord.objects.filter(consultation_id=consultation_id)
        radiological_exams = RadiologicalExam.objects.filter(consultation_id=consultation_id)
        biological_exams = BiologicalExam.objects.filter(consultation_id=consultation_id)

        
        nursing_data = NursingRecordSerializer(nursing_records, many=True).data
        for record in nursing_data:
            record["type"] = "nursing_record"
            record["date"] = record.pop("record_date")  # normalize the date field name
        
        radiological_data = RadiologicalExamSerializer(radiological_exams, many=True).data
        for exam in radiological_data:
            exam["type"] = "radiological_exam"
            exam["date"] = exam.pop("exam_date")  # normalize the date field name
        
        biological_data = BiologicalExamSerializer(biological_exams, many=True).data
        for exam in biological_data:
            exam["type"] = "biological_exam"
            exam["date"] = exam.pop("exam_date")  # normalize the date field name

        combined_data = nursing_data + radiological_data + biological_data
        combined_data_sorted = sorted(combined_data, key=lambda x: x["date"])

        return Response(combined_data_sorted, status=status.HTTP_200_OK)

