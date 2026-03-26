from flask import Flask
from flask import jsonify
from flask_cors import CORS

from .config import Config
from .routes.api import api_bp
from .routes.auth import auth_bp
from .services.alerting import AlertingService
from .services.storage import StorageService


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    allowed_origins = [
        origin.strip()
        for origin in str(app.config["FRONTEND_ORIGIN"]).split(",")
        if origin.strip()
    ]
    CORS(app, origins=allowed_origins or ["http://localhost:5173"])

    app.storage = StorageService(app.config["DATABASE_PATH"])
    app.alerting = AlertingService(app.config["ESP32_ALERT_URL"])

    app.register_blueprint(api_bp)
    app.register_blueprint(auth_bp)

    @app.errorhandler(Exception)
    def handle_exception(error):
        return jsonify({"success": False, "error": str(error)}), 500

    return app
