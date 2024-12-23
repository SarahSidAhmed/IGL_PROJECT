from django.urls import path
from .views import GetAllMedicinesByPrescriptionId, GetAllConsultationsByDpiId, AddRadiologicalExamAPIView, AddBiologicalExamAPIView, AddMedicineAPIView, CreateConsultationAPIView, CreatePrescriptionAPIView, DpiListCreateView, DpiDetailByIdView, DpiDetailBySSNView, StaffLoginAPIView, GetStaffByIdAPIView, GetAllDoctorsStaffAPIView, PatientSSNLoginAPIView, PatientQRLoginAPIView, GetAllDoctorsStaffAPIView

urlpatterns = [
    path('exam/biological/add', AddBiologicalExamAPIView.as_view(), name='add-biological-exam'),
    path('exam/radiological/add', AddRadiologicalExamAPIView.as_view(), name='add-radiological-exam'),
    path('medicine/add', AddMedicineAPIView.as_view(), name='add-medicine'),
    path('medicine/all/<int:prescription_id>', GetAllMedicinesByPrescriptionId.as_view(), name='get-all-medicines'),
    path('consultation/create', CreateConsultationAPIView.as_view(), name='create-consultation'),
    path('consultation/all/<int:dpi_id>', GetAllConsultationsByDpiId.as_view(), name='get-all-consultations'),
    path('create-prescription/', CreatePrescriptionAPIView.as_view(), name='create-prescription'),
    path('patient/login_ssn/', PatientSSNLoginAPIView.as_view(), name='patient-login-ssn'),
    path('patient/login_qr/', PatientQRLoginAPIView.as_view(), name='patient-login-qr'),
    path('doctors/', GetAllDoctorsStaffAPIView.as_view(), name='get-all-doctors'),
    path('staff/<int:id>/', GetStaffByIdAPIView.as_view(), name='get_staff_by_id'),
    path('login/', StaffLoginAPIView.as_view(), name='staff-login'), #for login
    path('dpis/', DpiListCreateView.as_view(), name='dpi-list-create'),
    path('dpis/<str:social_security_number>/', DpiDetailBySSNView.as_view(), name='dpi-detail'),
    path('dpis/qr/<int:id>/', DpiDetailByIdView.as_view(), name='dpi-detail-by-id'),  # For QR Code
]
