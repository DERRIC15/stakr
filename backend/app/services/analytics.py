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
    try:
        count = int(payload.get("count", 0))
    except (TypeError, ValueError):
        count = 0

    status = str(payload.get("status") or infer_status(count)).upper()
    if status not in {"SAFE", "WARNING", "DANGER"}:
        status = infer_status(count)

    exit_name = str(payload.get("exit") or infer_exit(count, status)).upper()
    if exit_name not in {"A", "B"}:
        exit_name = infer_exit(count, status)

    try:
        lat = float(payload.get("lat", 13.0827))
    except (TypeError, ValueError):
        lat = 13.0827

    try:
        lon = float(payload.get("lon", 80.2707))
    except (TypeError, ValueError):
        lon = 80.2707

    return {
        "status": status,
        "count": count,
        "exit": exit_name,
        "lat": lat,
        "lon": lon,
    }
