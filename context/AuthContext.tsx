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

  // INIT only once
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
      } catch {
        Cookies.remove("token");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = useCallback(async (data: any) => {
    const res = await loginApi(data);
    setAuth(res);
  }, []);

  const register = useCallback(async (data: any) => {
    const res = await registerApi(data);
    setAuth(res);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();

    Cookies.remove("token");
    setUser(null);
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
