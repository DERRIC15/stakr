import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta
from pathlib import Path


SCHEMA = """
CREATE TABLE IF NOT EXISTS latest_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    status TEXT NOT NULL,
    count INTEGER NOT NULL,
    exit TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL,
    count INTEGER NOT NULL,
    exit TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    detail TEXT NOT NULL,
    severity TEXT NOT NULL,
    exit TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""


class StorageService:
    def __init__(self, database_path):
        self.database_path = Path(database_path)
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        self.initialize()

    @contextmanager
    def connection(self):
        conn = sqlite3.connect(self.database_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        finally:
            conn.close()

    def initialize(self):
        with self.connection() as conn:
            conn.executescript(SCHEMA)
            exists = conn.execute("SELECT 1 FROM latest_state WHERE id = 1").fetchone()
            if not exists:
                now = datetime.utcnow().isoformat()
                conn.execute(
                    """
                    INSERT INTO latest_state (id, status, count, exit, lat, lon, updated_at)
                    VALUES (1, ?, ?, ?, ?, ?, ?)
                    """,
                    ("SAFE", 118, "A", 13.0827, 80.2707, now),
                )
        self.seed_history()

    def seed_history(self):
        with self.connection() as conn:
            total = conn.execute("SELECT COUNT(*) AS count FROM history").fetchone()["count"]
            if total:
                return

            now = datetime.utcnow()
            seed_rows = []
            statuses = ["SAFE", "SAFE", "WARNING", "WARNING", "DANGER", "WARNING", "SAFE"]
            counts = [96, 118, 164, 208, 292, 187, 122]

            for offset, (status, count) in enumerate(zip(statuses, counts)):
                timestamp = (now - timedelta(minutes=(len(statuses) - offset) * 3)).isoformat()
                seed_rows.append((status, count, "A" if count < 240 else "B", 13.0827, 80.2707, "seed", timestamp))

            conn.executemany(
                """
                INSERT INTO history (status, count, exit, lat, lon, source, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                seed_rows,
            )

            conn.executemany(
                """
                INSERT INTO alerts (title, detail, severity, exit, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                [
                    (
                        "Crowd surge detected",
                        "Density threshold crossed near sector alpha. Exit B prepared as alternate route.",
                        "WARNING",
                        "B",
                        (now - timedelta(minutes=9)).isoformat(),
                    ),
                    (
                        "Stampede risk escalation",
                        "Movement velocity spike detected. Evacuation guidance broadcast to nearby devices.",
                        "DANGER",
                        "A",
                        (now - timedelta(minutes=4)).isoformat(),
                    ),
                ],
            )

    def update_state(self, payload, source="ai"):
        now = datetime.utcnow().isoformat()
        with self.connection() as conn:
            conn.execute(
                """
                INSERT INTO latest_state (id, status, count, exit, lat, lon, updated_at)
                VALUES (1, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    status=excluded.status,
                    count=excluded.count,
                    exit=excluded.exit,
                    lat=excluded.lat,
                    lon=excluded.lon,
                    updated_at=excluded.updated_at
                """,
                (
                    payload["status"],
                    int(payload["count"]),
                    payload["exit"],
                    float(payload["lat"]),
                    float(payload["lon"]),
                    now,
                ),
            )
            conn.execute(
                """
                INSERT INTO history (status, count, exit, lat, lon, source, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload["status"],
                    int(payload["count"]),
                    payload["exit"],
                    float(payload["lat"]),
                    float(payload["lon"]),
                    source,
                    now,
                ),
            )

            if payload["status"] in {"WARNING", "DANGER"}:
                conn.execute(
                    """
                    INSERT INTO alerts (title, detail, severity, exit, created_at)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (
                        f"{payload['status']} crowd anomaly",
                        f"AI suggested evacuation toward Exit {payload['exit']} at coordinates {payload['lat']}, {payload['lon']}.",
                        payload["status"],
                        payload["exit"],
                        now,
                    ),
                )

    def get_latest_state(self):
        with self.connection() as conn:
            row = conn.execute("SELECT * FROM latest_state WHERE id = 1").fetchone()
            alerts = conn.execute(
                "SELECT title, detail, severity, exit, created_at FROM alerts ORDER BY id DESC LIMIT 4"
            ).fetchall()
        return {
            "status": row["status"],
            "count": row["count"],
            "exit": row["exit"],
            "lat": row["lat"],
            "lon": row["lon"],
            "updatedAt": row["updated_at"],
            "alerts": [
                {
                    "title": alert["title"],
                    "detail": alert["detail"],
                    "severity": alert["severity"],
                    "exit": alert["exit"],
                    "time": alert["created_at"][11:16],
                }
                for alert in alerts
            ],
            "health": {
                "uptime": "99.8%",
                "aiModel": "YOLOv8 + OpenCV",
                "gps": "ONLINE",
                "esp32": "CONNECTED",
            },
            "recommendedRoute": ["Zone", "Holding Corridor", f"Exit {row['exit']}"],
        }

    def get_history(self, limit=18):
        with self.connection() as conn:
            rows = conn.execute(
                """
                SELECT status, count, exit, lat, lon, created_at
                FROM history
                ORDER BY id DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        history = list(reversed(rows))
        return [
            {
                "status": row["status"],
                "count": row["count"],
                "exit": row["exit"],
                "lat": row["lat"],
                "lon": row["lon"],
                "time": row["created_at"][11:16],
            }
            for row in history
        ]
