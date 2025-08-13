"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: "user" | "admin" | "super_admin";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: "user" | "admin" | "super_admin";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on app start
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get existing users from localStorage
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const foundUser = existingUsers.find((u: User) => u.email === email);

    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: "User not found. Please sign up first." };
    }

    // In a real app, you'd verify the password hash
    // For demo purposes, we'll just check if user exists

    setUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setIsLoading(false);

    return { success: true };
  };

  const register = async (
    userData: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get existing users from localStorage
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    // Check if user already exists
    if (existingUsers.find((u: User) => u.email === userData.email)) {
      setIsLoading(false);
      return { success: false, error: "User with this email already exists." };
    }

    // Create new user
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
      status: userData.role === "admin" ? "pending" : "approved",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsLoading(false);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
