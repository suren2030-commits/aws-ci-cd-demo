from django.urls import path
from .health import health

urlpatterns = [
    # health endpoint: will be available as /api/health once included at project level
    path('health', health, name='api-health'),
]
