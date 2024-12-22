from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi, Staff, Prescription
from .serializers import DpiSerializer, StaffLoginSerializer, StaffSerializer, PrescriptionValidationSerializer
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
class GetAllDoctorsStaffAPIView(ListCreateAPIView):
    queryset = Staff.objects.filter(role="Doctor")
    serializer_class = StaffSerializer

    
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