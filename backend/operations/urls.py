from django.urls import path
from .views import kpi_overview, kpi_history, health

urlpatterns = [
    path("kpis/", kpi_overview, name="kpi-overview"),
    path("kpis/history/", kpi_history, name="kpi-history"),
    path("health/", health, name="health"),
]
