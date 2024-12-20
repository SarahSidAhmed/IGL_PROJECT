from django.urls import path
from .views import DpiListCreateView, DpiDetailByIdView, DpiDetailBySSNView, StaffLoginAPIView, GetStaffByIdAPIView

urlpatterns = [
    path('staff/<int:id>/', GetStaffByIdAPIView.as_view(), name='get_staff_by_id'),
    path('login/', StaffLoginAPIView.as_view(), name='staff-login'), #for login
    path('dpis/', DpiListCreateView.as_view(), name='dpi-list-create'),
    path('dpis/<str:social_security_number>/', DpiDetailBySSNView.as_view(), name='dpi-detail'),
    path('dpis/qr/<int:id>/', DpiDetailByIdView.as_view(), name='dpi-detail-by-id'),  # For QR Code
]
