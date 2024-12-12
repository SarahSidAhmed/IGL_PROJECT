from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Dpi
from .serializers import DpiSerializer

class DpiListCreateView(ListCreateAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiSerializer


# Retrieve part is just for DEMO, DPI retrieval is far more complex
class DpiRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Dpi.objects.all()
    serializer_class = DpiSerializer