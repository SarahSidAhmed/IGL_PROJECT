from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('nursing-records/search/', NursingRecordListView.as_view(), name='nursing-record-list-filtered'),
    path('radiological-exams/search/', RadiologicalExamListView.as_view(), name='radiological-exam-list-filtered'),
    path('biological-exams/search/', BiologicalExamListView.as_view(), name='biological-exam-list-filtered'),
    path('radiological-exams/create/', RadiologicalExamCreateView.as_view(), name='create-radiological-exam'),
    path('radiological-exams/<int:pk>/update/', RadiologicalExamUpdateView.as_view(), name='update-radiological-exam'),
    path('nursing-records/create/', NursingRecordCreateView.as_view(), name='nursing-record-create'),
    path('nursing-records/<int:pk>/update/', NursingRecordUpdateView.as_view(), name='nursing-record-update'),
    path('biological-exams/create/', BiologicalExamCreateView.as_view(), name='biological-exam-create'),
    path('biological-exams/update/<int:pk>/', BiologicalExamUpdateView.as_view(), name='biological-exam-update'),
    path('medicine/add', AddMedicineAPIView.as_view(), name='add-medicine'),
    path('medicine/delete/<int:id>', DeleteUpdateMedicineAPIView.as_view(), name='delete-medicine'),
    path('consultation/create', CreateConsultationAPIView.as_view(), name='create-consultation'),
    path('consultation/update/<int:id>', UpdateConsultationAPIView.as_view(), name='update-consultation'),
    path('consultation/all/<int:dpi_id>', GetAllConsultationsByDpiId.as_view(), name='get-all-consultations'),
    path('patient/login/', PatientLoginView.as_view(), name='patient-login'),
    path('doctors/', GetAllDoctorsStaffAPIView.as_view(), name='get-all-doctors'),
    path('staff/<int:id>/', GetStaffByIdAPIView.as_view(), name='get_staff_by_id'),
    path('login/', StaffLoginAPIView.as_view(), name='staff-login'), #for login
    path('dpis/', DpiCreateView.as_view(), name='dpi-create'),
    path('dpis/search/', DpiSearchBySSNView.as_view(), name='dpi-search-ssn'),
    path('dpis/<int:id>/', DpiDetailByIdView.as_view(), name='dpi-detail-by-id'),
    path('dpis/<int:id>/exams/', UnifiedExamRecordView.as_view(), name='unified-exam-record'),
    path('validate-prescription/', ValidatePrescriptionView.as_view(), name='validate-prescription'), # For SGPH system
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
