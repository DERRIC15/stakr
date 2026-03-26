const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function fetchDashboardData(language) {
  return request(`/data?lang=${language}`);
}

export function fetchHistoryData() {
  return request("/history");
}

export function loginAdmin(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function triggerAlert(payload) {
  return request("/trigger-alert", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function pushAiUpdate(payload) {
  return request("/update", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
