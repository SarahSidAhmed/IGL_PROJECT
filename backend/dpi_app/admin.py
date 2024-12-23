from django.contrib import admin
from .models import BiologicalExam, BiologicalExamParam, Consultation, Medicine, NursingRecord, Prescription, RadiologicalExam, Staff, Dpi

# Register models
admin.site.register(Staff)
admin.site.register(Dpi)
admin.site.register(Consultation)
admin.site.register(Prescription)
admin.site.register(Medicine)
admin.site.register(BiologicalExam)
admin.site.register(BiologicalExamParam)
admin.site.register(RadiologicalExam)
admin.site.register(NursingRecord)

