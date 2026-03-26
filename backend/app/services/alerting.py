from datetime import datetime


class AlertingService:
    def __init__(self, endpoint):
        self.endpoint = endpoint

    def trigger(self, status, exit_name):
        return {
            "success": True,
            "target": self.endpoint,
            "status": status,
            "exit": exit_name,
            "triggeredAt": datetime.utcnow().isoformat(),
            "transport": "HTTP or MQTT bridge ready",
        }
