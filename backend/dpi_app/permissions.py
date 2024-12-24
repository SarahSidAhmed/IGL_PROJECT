from rest_framework.permissions import BasePermission

class IsDoctor(BasePermission):
    
   # Allows access only to users with the role 'Doctor'.
    
    def has_permission(self, request, view):
        return hasattr(request.user, 'role') and request.user.role == "Doctor"

class IsLabTechnician(BasePermission):
   # Allows access only to users with the role 'Lab Technician'.
    def has_permission(self, request, view):
        return hasattr(request.user, 'role') and request.user.role == "Lab Technician"

class IsNurse(BasePermission):
    def has_permission(self, request, view):
       return hasattr(request.user, 'role') and request.user.role == "Nurse"
class IsRadiologist(BasePermission):
    #Allows access only to users with the 'Radiologist' role.
    def has_permission(self, request, view):
        return hasattr(request.user, 'role') and request.user.role == "Radiologist"