import { useEffect, useState } from "react";
import { fetchDashboardData, fetchHistoryData } from "../lib/api";

const fallbackState = {
  data: {
    status: "SAFE",
    count: 118,
    exit: "A",
    lat: 13.0827,
    lon: 80.2707,
    alerts: [],
    health: {
      uptime: "99.8%",
      aiModel: "YOLOv8 Crowd",
      gps: "ONLINE",
      esp32: "CONNECTED",
    },
    recommendedRoute: ["Zone", "Corridor", "Exit A"],
  },
  history: [],
};

export function useRealtimeData(language) {
  const [state, setState] = useState(fallbackState);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [data, history] = await Promise.all([fetchDashboardData(language), fetchHistoryData()]);
        if (!active) {
          return;
        }

        setState({
          data: { ...fallbackState.data, ...data },
          history: history.history ?? fallbackState.history,
        });
        setError("");
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to connect to backend");
        }
      } finally {
        if (active) {
          setInitialLoading(false);
        }
      }
    };

    load();
    const timer = window.setInterval(load, 1000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [language]);

  return {
    ...state,
    error,
    initialLoading,
  };
}
