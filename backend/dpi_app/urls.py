from django.urls import path
from .views import DpiListCreateView, DpiDetailByIdView, DpiDetailBySSNView, StaffLoginAPIView

urlpatterns = [
    path('login/', StaffLoginAPIView.as_view(), name='staff-login'),
    path('dpis/', DpiListCreateView.as_view(), name='dpi-list-create'),
    path('dpis/<str:social_security_number>/', DpiDetailBySSNView.as_view(), name='dpi-detail'),
    path('dpis/qr/<int:id>/', DpiDetailByIdView.as_view(), name='dpi-detail-by-id'),  # For QR Code
]
