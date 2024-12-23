from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi, Staff, Prescription, Consultation, Medicine, BiologicalExam, RadiologicalExam
from .serializers import BiologicalExamSerializer, MedicineSerializer, ConsultationSerializer, DpiSerializer, StaffLoginSerializer, StaffSerializer, PatientSSNLoginSerializer, PatientQRLoginSerializer, PrescriptionSerializer, RadiologicalExamSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema

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

#this is for the login of the patient
class PatientSSNLoginAPIView(APIView):
    @swagger_auto_schema(request_body=PatientSSNLoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer_class = PatientSSNLoginSerializer(data=request.data)
        if serializer_class.is_valid():
            patient = Dpi.objects.get(social_security_number=serializer_class.validated_data["SSN"])

            # Generate JWT tokens
            refresh = RefreshToken.for_user(patient)
            patient_serialized = DpiSerializer(patient)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "dpi": patient_serialized.data
            }, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

#this is for the login of the patient with the QR code
class PatientQRLoginAPIView(APIView):
    @swagger_auto_schema(request_body=PatientQRLoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer_class = PatientQRLoginSerializer(data=request.data)
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

class CreatePrescriptionAPIView(APIView):
    @swagger_auto_schema(request_body=PrescriptionSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PrescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateConsultationAPIView(APIView):
    @swagger_auto_schema(request_body=ConsultationSerializer)
    def post(self, request, *args, **kwargs):
        serializer = ConsultationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddMedicineAPIView(APIView):
    @swagger_auto_schema(request_body=MedicineSerializer)
    def post(self, request, *args, **kwargs):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
class DeleteUpdateMedicineAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    lookup_field = 'id'

 #not sure yet 
class AddBiologicalExamAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BiologicalExamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddRadiologicalExamAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RadiologicalExam(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#not sure yet

class GetAllBiologicalExamsByConsultationId(ListCreateAPIView):
    queryset = BiologicalExam.objects.all()
    serializer_class = BiologicalExamSerializer

class GetAllRadiologicalExamsByConsultationId(ListCreateAPIView):
    queryset = RadiologicalExam.objects.all()
    serializer_class = RadiologicalExamSerializer

class GetAllMedicinesByPrescriptionId(APIView):
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
    
    def get(self, request, dpi_id, *args, **kwargs):
        consultations = Consultation.objects.filter(dpi_id=dpi_id)
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DpiListCreateView(ListCreateAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiSerializer


class DpiDetailBySSNView(RetrieveUpdateDestroyAPIView):
    queryset = Dpi.objects.prefetch_related(
        'consultation_set__biologicalexam_set',
        'consultation_set__radiologicalexam_set',
        'consultation_set__nursingrecord_set'
    ).select_related('doctor')
    serializer_class = DpiSerializer
    lookup_field = 'social_security_number'


class DpiDetailByIdView(RetrieveUpdateDestroyAPIView):
    queryset = Dpi.objects.prefetch_related(
        'consultation_set__biologicalexam_set',
        'consultation_set__radiologicalexam_set',
        'consultation_set__nursingrecord_set'
    ).select_related('doctor')
    serializer_class = DpiSerializer
    lookup_field = 'id'