import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "smartcity123")
    DATABASE_PATH = str(BASE_DIR / os.getenv("DATABASE_PATH", "instance/stampede.db"))
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
    ESP32_ALERT_URL = os.getenv("ESP32_ALERT_URL", "http://127.0.0.1:8080/alert")
