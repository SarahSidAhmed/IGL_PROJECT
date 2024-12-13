from django.urls import path
from .views import DpiListCreateView, DpiDetailView

urlpatterns = [
    path('dpis/', DpiListCreateView.as_view(), name='dpi-list-create'),
    path('dpis/<str:social_security_number>/', DpiDetailView.as_view(), name='dpi-detail'),
    path('dpis/qr/<int:id>/', DpiDetailView.as_view(), name='dpi-detail-by-id'),  # For QR Code
]
