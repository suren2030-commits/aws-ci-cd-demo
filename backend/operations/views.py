from django.http import JsonResponse
from datetime import datetime, timedelta
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

def kpi_history(request):
    """
    Time-series KPI endpoint for charts.
    Returns ~1 hour of data points at 5-minute intervals.
    """
    now = datetime.utcnow()
    points = []

    # 12 points: last 55 minutes, 5-minute step
    for i in range(12):
        ts = now - timedelta(minutes=5 * (11 - i))

        on_time = random.randint(80, 95)
        delayed = 100 - on_time

        points.append(
            {
                "timestamp": ts.isoformat() + "Z",
                "total_flights": random.randint(90, 140),
                "on_time_percent": on_time,
                "delayed_percent": delayed,
                "security_queue_avg_minutes": random.randint(5, 25),
            }
        )

    return JsonResponse({"points": points})
