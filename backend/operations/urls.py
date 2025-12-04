from django.urls import path
from .views import kpi_overview

urlpatterns = [
    path("kpis/", kpi_overview, name="kpi-overview"),
]
