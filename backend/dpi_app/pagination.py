from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class DpiPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'results': data,
        })