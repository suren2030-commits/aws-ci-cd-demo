from django.http import JsonResponse
from datetime import datetime
import random


def kpi_overview(request):
    """
    Simple dummy KPI endpoint for airport operations.
    Returns numbers that change a bit on each request to feel 'live'.
    """

    # Fake "live" numbers
    on_time = random.randint(80, 95)
    delayed = 100 - on_time

    data = {
      "timestamp": datetime.utcnow().isoformat() + "Z",
      "airport": "Demo International",
      "total_flights": 120,
      "on_time_percent": on_time,
      "delayed_percent": delayed,
      "active_stands": random.randint(18, 24),
      "baggage_belts_in_use": random.randint(5, 10),
      "security_queue_avg_minutes": random.randint(5, 25),
    }

    return JsonResponse(data)
