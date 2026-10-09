const base = import.meta.env.VITE_API_URL || "/api";
export async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res
    .json()
    .catch(() => ({ message: "Respuesta inesperada del servidor." }));
  if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
  return data;
}
export const api = {
  activities: (category = "") =>
    request(
      `/activities${category ? `?category=${encodeURIComponent(category)}` : ""}`,
    ),
  activity: (id) => request(`/activities/${id}`),
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  reservations: () => request("/reservations"),
  reserve: (activityId) =>
    request("/reservations", {
      method: "POST",
      body: JSON.stringify({ activityId }),
    }),
  createActivity: (body) =>
    request("/activities", { method: "POST", body: JSON.stringify(body) }),
};
