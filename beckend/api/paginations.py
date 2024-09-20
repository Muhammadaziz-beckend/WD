from math import ceil
from httplib2 import Response
from rest_framework.pagination import PageNumberPagination


class SimplePagintion(PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,  
            'page_size': self.page.paginator.per_page,  
            'current_page': self.page.number,  
            'total_pages': ceil(self.page.paginator.count / self.page.paginator.per_page), 
            'next': self.get_next_link(), 
            'previous': self.get_previous_link(),  
            'results': data  \
        })