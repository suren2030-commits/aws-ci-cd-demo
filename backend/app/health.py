# backend/yourapp/views_health.py
from django.http import JsonResponse
from django.db import connections, OperationalError

def health(request):
    # lightweight DB check (optional)
    db_ok = True
    try:
        c = connections['default']
        c.cursor().execute('SELECT 1')
    except OperationalError:
        db_ok = False

    status = 200 if db_ok else 500
    return JsonResponse({"status": "ok" if db_ok else "db_error"}, status=status)
