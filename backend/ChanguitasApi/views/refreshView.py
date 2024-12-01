from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class RefreshView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"message": "Refresh endpoint working!"})