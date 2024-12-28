from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class DpiPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })
    

class ConsultationPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })

class BiologicalExamPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })

class RadiologicalExamPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })

class NursingRecordPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })