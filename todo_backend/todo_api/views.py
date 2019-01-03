import pprint

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    # queryset = Task.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        current_user = self.request.user
        # pprint.pprint(self.request.META)
        return Task.objects.filter(user=current_user)
