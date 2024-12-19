from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi, Staff
from .serializers import DpiSerializer, StaffLoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class StaffLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = StaffLoginSerializer(data=request.data)
        if serializer.is_valid():
            staff = Staff.objects.get(email=serializer.validated_data["email"])

            # Generate JWT tokens
            refresh = RefreshToken.for_user(staff)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": serializer.validated_data["role"]
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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