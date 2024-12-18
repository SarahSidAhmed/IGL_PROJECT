from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi
from .serializers import DpiSerializer
from rest_framework.response import Response
from rest_framework import status

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