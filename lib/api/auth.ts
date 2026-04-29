import api from "./client";
import { AuthResponse, LoginPayload, User } from "./type";

/**
 * REGISTER
 */
export const register = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post("/register", payload);
  return data;
};

/**
 * LOGIN
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post("/login", payload);
  return data;
};

/**
 * GET CURRENT USER
 */
export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/user");
  return data;
};

/**
 * LOGOUT
 */
export const logout = async (): Promise<void> => {
  await api.post("/logout");
};
