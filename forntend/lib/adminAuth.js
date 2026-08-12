"use client";

const ADMIN_SESSION_KEY = "curveComfortAdminSession";
const API_BASE_URL = "/api/v1";

const parseJson = async (response) => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const apiRequest = async (path, { token, ...options } = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers,
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload.data || {};
};

export const getStoredAdminSession = () => {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
  } catch {
    return null;
  }
};

export const saveAdminSession = (session) => {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const loginAdmin = async ({ email, password }) => {
  const session = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  saveAdminSession(session);
  return session;
};

export const getCurrentAdmin = (token) => apiRequest("/auth/me", { token });

export const getAdmins = (token) => apiRequest("/auth/admins", { token });

export const createAdmin = (token, admin) =>
  apiRequest("/auth/admins", {
    method: "POST",
    token,
    body: JSON.stringify(admin),
  });

export const updateAdmin = (token, id, admin) =>
  apiRequest(`/auth/admins/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(admin),
  });

export const deleteAdmin = (token, id) =>
  apiRequest(`/auth/admins/${id}`, {
    method: "DELETE",
    token,
  });
