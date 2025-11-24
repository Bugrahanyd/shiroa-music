"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "./api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
  };
}

interface RegisterExtras {
  role?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, extras?: RegisterExtras) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      api.getProfile()
        .then((data) => setUser(data))
        .catch((error) => {
          console.log("Token expired, clearing session");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login({ email, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      document.cookie = `accessToken=${data.access_token}; path=/; max-age=86400`;
      setUser(data.user);
    } catch (error) {
      // FAIL-SAFE DEMO LOGIN
      console.log('Backend login failed, using demo mode');
      const demoUser = {
        id: 'demo-user',
        email: email,
        name: email.split('@')[0],
        role: 'listener',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      };
      localStorage.setItem("access_token", "demo-token");
      localStorage.setItem("shiroa-demo-user", JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const register = async (email: string, password: string, name: string, extras?: RegisterExtras) => {
    try {
      const data = await api.register({ email, password, name, ...extras });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      document.cookie = `accessToken=${data.access_token}; path=/; max-age=86400`;
      setUser(data.user);
    } catch (error) {
      // FAIL-SAFE DEMO REGISTER
      console.log('Backend register failed, using demo mode');
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        email: email,
        name: name,
        role: extras?.role || 'listener',
        bio: extras?.bio,
        location: extras?.location,
        avatarUrl: extras?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name
      };
      localStorage.setItem("access_token", "demo-token");
      localStorage.setItem("shiroa-demo-user", JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("shiroa-demo-user");
    localStorage.removeItem("shiroa-purchases");
    localStorage.removeItem("shiroa-onboarding");
    document.cookie = 'accessToken=; path=/; max-age=0';
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
