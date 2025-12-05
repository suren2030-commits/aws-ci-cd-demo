from django.http import JsonResponse
from datetime import datetime, timedelta
import random


def kpi_overview(request):
    """
    Simple dummy KPI endpoint for airport operations.
    Returns numbers that change a bit on each request to feel 'live'.
    """
    on_time = random.randint(80, 95)
    delayed = 100 - on_time

    arrivals_last_hour = random.randint(50, 90)
    departures_last_hour = random.randint(50, 90)
    runway_occupancy = random.randint(60, 95)  # %
    avg_turnaround = random.randint(35, 55)    # minutes

    weather_condition = random.choice(
        ["Clear", "Partly cloudy", "Overcast", "Light rain", "Thunderstorms nearby"]
    )
    temperature_c = random.randint(22, 34)

    data = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "airport": "Demo International",
        "total_flights": arrivals_last_hour + departures_last_hour,
        "on_time_percent": on_time,
        "delayed_percent": delayed,
        "active_stands": random.randint(18, 24),
        "baggage_belts_in_use": random.randint(5, 10),
        "security_queue_avg_minutes": random.randint(5, 25),

        # New KPIs
        "arrivals_last_hour": arrivals_last_hour,
        "departures_last_hour": departures_last_hour,
        "runway_occupancy_percent": runway_occupancy,
        "average_turnaround_minutes": avg_turnaround,
        "weather_condition": weather_condition,
        "temperature_c": temperature_c,
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
