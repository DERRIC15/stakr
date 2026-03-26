def infer_exit(count, status):
    if status == "DANGER":
        return "B" if count > 260 else "A"
    if status == "WARNING":
        return "A" if count < 220 else "B"
    return "A"


def infer_status(count):
    if count >= 260:
        return "DANGER"
    if count >= 160:
        return "WARNING"
    return "SAFE"


def normalize_payload(payload):
    count = int(payload.get("count", 0))
    status = payload.get("status") or infer_status(count)
    return {
        "status": status,
        "count": count,
        "exit": payload.get("exit") or infer_exit(count, status),
        "lat": float(payload.get("lat", 13.0827)),
        "lon": float(payload.get("lon", 80.2707)),
    }
