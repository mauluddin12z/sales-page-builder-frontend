"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import {
  login as loginApi,
  logout as logoutApi,
  getMe,
  register as registerApi,
} from "@/lib/api/auth";
import { User } from "@/lib/types/auth";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuth = (res: any) => {
    Cookies.set("token", res.token);
    setUser(res.user);
  };

  useEffect(() => {
    const init = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await getMe();
        setUser(me);
      } catch (err) {
        Cookies.remove("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = useCallback(async (data: any) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await loginApi(data);
      setAuth(res);

      toast.success("Welcome back!", { id: toastId });
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid credentials", { id: toastId });
      throw err;
    }
  }, []);

  const register = useCallback(async (data: any) => {
    const toastId = toast.loading("Creating account...");

    try {
      const res = await registerApi(data);
      setAuth(res);

      toast.success("Account created successfully", { id: toastId });
    } catch (err) {
      console.error("Register failed:", err);
      toast.error("Failed to create account", { id: toastId });
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    const toastId = toast.loading("Signing out...");

    try {
      await logoutApi();
    } catch (e) {
      console.warn("logout failed, continuing anyway");
    }

    Cookies.remove("token");
    setUser(null);

    toast.success("Logged out", { id: toastId });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");

  return ctx;
};
