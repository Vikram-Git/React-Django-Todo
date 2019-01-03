from django.contrib import admin
from django.urls import path, re_path ,include

from todo_api.views import TaskViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'task', TaskViewSet, base_name='task')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
