# 1. Base image
FROM python:3.12-slim

# 2. Work directory inside container
WORKDIR /app

# 3. Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy app code
COPY . .

# 5. Expose port (FastAPI will use 8000)
EXPOSE 8000

# 6. Start FastAPI with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
