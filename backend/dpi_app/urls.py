from django.urls import path
from .views import DpiListCreateView, DpiRetrieveUpdateDestroyView

urlpatterns = [
    path('dpis/', DpiListCreateView.as_view(), name='dpi-list-create'),
    path('dpis/<int:pk>/', DpiRetrieveUpdateDestroyView.as_view(), name='dpi-detail'),
]
