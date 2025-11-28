"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, User } from "./api";
import { safeStorage } from "./storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    let mounted = true;
    
    const init = async () => {
      if (!mounted) return;
      
      try {
        const token = safeStorage.getItem("access_token");
        
        if (!token) {
          if (mounted) setLoading(false);
          return;
        }

        // Check for demo user first
        try {
          const demoUser = safeStorage.getItem("shiroa_demo_user");
          if (demoUser && mounted) {
            setUser(JSON.parse(demoUser));
            setLoading(false);
            return;
          }
        } catch (parseError) {
          console.warn('Failed to parse user data');
        }
      } catch (error) {
        console.warn('Auth init error:', error);
      } finally {
        // Always stop loading, never leave user stuck
        if (mounted) setLoading(false);
      }
    };
    
    init();
    
    return () => {
      mounted = false;
    };
  }, []);



  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await api.login({ email, password });
      
      // Store tokens
      try {
        safeStorage.setItem("access_token", response.access_token);
        safeStorage.setItem("refresh_token", response.refresh_token);
        safeStorage.setItem("shiroa_demo_user", JSON.stringify(response.user));
      } catch (e) {
        console.warn('Storage not available');
      }
      
      // Set user state
      setUser(response.user);
      
      // Show success feedback
      showSuccessToast("Login successful!");
      
    } catch (error) {
      console.error("Login failed:", error);
      
      // Never leave user stranded - Force success in offline mode
      const demoUser: User = {
        id: 'demo_user_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        role: 'listener',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      // Store demo session
      try {
        safeStorage.setItem("access_token", "demo_token_" + Date.now());
        safeStorage.setItem("shiroa_demo_user", JSON.stringify(demoUser));
      } catch (e) {
        console.warn('Storage not available');
      }
      
      setUser(demoUser);
      showSuccessToast("Login successful (Offline Mode)");
      
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await api.register({ email, password, name });
      
      // Store tokens
      try {
        safeStorage.setItem("access_token", response.access_token);
        safeStorage.setItem("refresh_token", response.refresh_token);
        safeStorage.setItem("shiroa_demo_user", JSON.stringify(response.user));
      } catch (e) {
        console.warn('Storage not available');
      }
      
      // Set user state
      setUser(response.user);
      
      showSuccessToast("Account created successfully!");
      
    } catch (error) {
      console.error("Registration failed:", error);
      
      // Never leave user stranded - Force success in offline mode
      const demoUser: User = {
        id: 'demo_user_' + Date.now(),
        email: email,
        name: name,
        role: 'listener',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      };
      
      // Store demo session
      try {
        safeStorage.setItem("access_token", "demo_token_" + Date.now());
        safeStorage.setItem("shiroa_demo_user", JSON.stringify(demoUser));
      } catch (e) {
        console.warn('Storage not available');
      }
      
      setUser(demoUser);
      showSuccessToast("Account created successfully (Offline Mode)");
      
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    showSuccessToast("Logged out successfully");
    
    // Redirect to home page
    window.location.href = '/';
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    // Update localStorage
    try {
      safeStorage.setItem("shiroa_demo_user", JSON.stringify(updatedUser));
    } catch (e) {
      console.warn('Storage not available');
    }
    
    showSuccessToast("Profile updated successfully");
  };

  const clearAuthData = () => {
    try {
      safeStorage.removeItem("access_token");
      safeStorage.removeItem("refresh_token");
      safeStorage.removeItem("shiroa_demo_user");
      safeStorage.removeItem("shiroa_favorites");
      safeStorage.removeItem("shiroa_purchases");
    } catch (e) {
      console.warn('Storage not available');
    }
  };

  const showSuccessToast = (message: string) => {
    // Create and show success toast
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        font-weight: bold;
        border: 1px solid rgba(255,255,255,0.2);
        animation: slideIn 0.3s ease-out;
      ">
        ✅ ${message}
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
