import { API_URL } from "./api";

export interface User {
  id: number | string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface GoogleRedirectResponse {
  url: string;
}

export async function loginWithGoogle(): Promise<void> {
  const res = await fetch(`${API_URL}/auth/redirect/google`);

  if (!res.ok) {
    throw new Error("Failed to get Google redirect URL");
  }

  const data: GoogleRedirectResponse = await res.json();
  window.location.href = data.url;
}

export function saveSession(token: string, user: User): void {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  document.cookie = `token=${token}; path=/; max-age=604800`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export function logout(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.cookie = "token=; path=/; max-age=0";

  window.location.href = "/";
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
