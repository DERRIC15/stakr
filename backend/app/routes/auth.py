from flask import Blueprint, current_app, jsonify, request

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.post("/login")
def login():
    payload = request.get_json(force=True, silent=True) or {}
    username = payload.get("username", "")
    password = payload.get("password", "")

    if (
        username == current_app.config["ADMIN_USERNAME"]
        and password == current_app.config["ADMIN_PASSWORD"]
    ):
        return jsonify({"success": True, "username": username})

    return jsonify({"success": False, "message": "Invalid credentials"}), 401
