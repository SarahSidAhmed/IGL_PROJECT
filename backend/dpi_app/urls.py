from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('consultations/<int:consultation_id>/records/', AllRecordsAndExamsForConsultationView.as_view(), name='all_records_and_exams_for_consultation'),
    path('dpi/<int:dpi_id>/nursing-records/', NursingRecordsForDpiView.as_view(), name='nursing_records_for_dpi'),
    path('dpi/<int:dpi_id>/exams/', AllExamsForDpiView.as_view(), name='all-exams-for-dpi'),
    path('radiological-exams/create/', RadiologicalExamCreateView.as_view(), name='create-radiological-exam'),
    path('radiological-exams/<int:pk>/update/', RadiologicalExamUpdateView.as_view(), name='update-radiological-exam'),
    path('nursing-records/create/', NursingRecordCreateView.as_view(), name='nursing-record-create'),
    path('nursing-records/<int:pk>/update/', NursingRecordUpdateView.as_view(), name='nursing-record-update'),
    path('biological-exam/create/', BiologicalExamCreateView.as_view(), name='biological-exam-create'),
    path('biological-exam/update/<int:pk>/', BiologicalExamUpdateView.as_view(), name='biological-exam-update'),
    path('medicine/add', AddMedicineAPIView.as_view(), name='add-medicine'),
    path('consultation/create', CreateConsultationAPIView.as_view(), name='create-consultation'),
    path('consultation/all/<int:dpi_id>', GetAllConsultationsByDpiId.as_view(), name='get-all-consultations'),
    path('create-prescription/', CreatePrescriptionAPIView.as_view(), name='create-prescription'),
    path('patient/login/', PatientLoginView.as_view(), name='patient-login'),
    path('doctors/', GetAllDoctorsStaffAPIView.as_view(), name='get-all-doctors'),
    path('staff/<int:id>/', GetStaffByIdAPIView.as_view(), name='get_staff_by_id'),
    path('login/', StaffLoginAPIView.as_view(), name='staff-login'), #for login
    path('dpis/', DpiCreateView.as_view(), name='dpi-create'),
    path('dpis/search/<str:ssn_prefix>/', DpiSearchBySSNView.as_view(), name='dpi-search-ssn'),
    path('dpis/<int:id>/', DpiDetailByIdView.as_view(), name='dpi-detail-by-id'),
    path('validate-prescription/', ValidatePrescriptionView.as_view(), name='validate-prescription'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
