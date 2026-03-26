from flask import Flask
from flask_cors import CORS

from .config import Config
from .routes.api import api_bp
from .routes.auth import auth_bp
from .services.alerting import AlertingService
from .services.storage import StorageService


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=[app.config["FRONTEND_ORIGIN"]])

    app.storage = StorageService(app.config["DATABASE_PATH"])
    app.alerting = AlertingService(app.config["ESP32_ALERT_URL"])

    app.register_blueprint(api_bp)
    app.register_blueprint(auth_bp)

    return app
