from flask import Blueprint, current_app, jsonify, request

from ..services.analytics import normalize_payload

api_bp = Blueprint("api", __name__)


@api_bp.get("/health")
def health():
    return jsonify({"ok": True})


@api_bp.get("/data")
def get_data():
    state = current_app.storage.get_latest_state()
    return jsonify(state)


@api_bp.post("/update")
def update_data():
    payload = request.get_json(force=True, silent=True) or {}
    normalized = normalize_payload(payload)
    current_app.storage.update_state(normalized, source=payload.get("source", "ai"))
    return jsonify({"success": True, "data": normalized})


@api_bp.get("/history")
def history():
    return jsonify({"history": current_app.storage.get_history()})


@api_bp.post("/trigger-alert")
def trigger_alert():
    payload = request.get_json(force=True, silent=True) or {}
    status = payload.get("status", "WARNING")
    exit_name = payload.get("exit", "A")
    result = current_app.alerting.trigger(status, exit_name)
    return jsonify(result)
