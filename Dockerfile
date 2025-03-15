FROM python:3.9-slim-buster

WORKDIR /app
COPY ./ /app
RUN pip install -r requirements.txt

ENV PYTHONPATH=/app
EXPOSE 8000

CMD ["fastapi", "run", "--port", "8080"]