from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class BlogPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        
        response =  super().get_paginated_response(data)
        print(response.data)
        response.data['page_size'] = self.page_size
        return response