from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi
from .serializers import DpiSerializer
from rest_framework.response import Response
from rest_framework import status

class DpiListCreateView(ListCreateAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiSerializer


class DpiDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiSerializer
    lookup_field = "social_security_number"

    def get(self, request, **kwargs):
        dpi = None
        if 'id' in kwargs:
            try:
                dpi = Dpi.objects.prefetch_related(
                    'consultation_set__biologicalexam_set',
                    'consultation_set__radiologicalexam_set',
                    'consultation_set__nursingrecord_set'
                ).select_related('doctor').get(id=kwargs['id'])
            except Dpi.DoesNotExist:
                return Response({"error": "Dpi not found"}, status=status.HTTP_404_NOT_FOUND)
        elif 'social_security_number' in kwargs:
            try:
                dpi = Dpi.objects.prefetch_related(
                    'consultation_set__biologicalexam_set',
                    'consultation_set__radiologicalexam_set',
                    'consultation_set__nursingrecord_set'
                ).select_related('doctor').get(social_security_number=kwargs['social_security_number'])
            except Dpi.DoesNotExist:
                return Response({"error": "Dpi not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DpiSerializer(dpi)
        return Response(serializer.data, status=status.HTTP_200_OK)