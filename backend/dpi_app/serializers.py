from rest_framework import serializers
from .models import Dpi

class DpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpi
        exclude  = ['admission_date']