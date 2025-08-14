"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Building, Shield, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminOnly?: boolean;
  onSuccess?: () => void; // Added callback for successful authentication
  defaultToSignup?: boolean; // Added prop to control default mode
}

export default function AuthModal({
  isOpen,
  onClose,
  adminOnly = true,
  onSuccess,
  defaultToSignup = false,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(!defaultToSignup); // Use defaultToSignup to set initial state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: adminOnly
      ? ("admin" as "user" | "admin" | "super_admin")
      : ("user" as "user" | "admin" | "super_admin"), // Default role based on adminOnly prop
  });
  const [error, setError] = useState("");

  const { login, register, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!isLogin && formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
        });
      }

      if (result.success) {
        onClose();
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          role: adminOnly ? "admin" : "user",
        });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  const roleOptions = adminOnly
    ? [
        {
          value: "admin",
          label: "Venue Owner",
          icon: Building,
          description: "Manage event halls",
        },
        {
          value: "super_admin",
          label: "Super Admin",
          icon: Shield,
          description: "Platform administrator",
        },
      ]
    : [
        {
          value: "user",
          label: "Event Organizer",
          icon: Building,
          description: "Book venues for events",
        },
        {
          value: "admin",
          label: "Venue Owner",
          icon: Building,
          description: "Manage event halls",
        },
        {
          value: "super_admin",
          label: "Super Admin",
          icon: Shield,
          description: "Platform administrator",
        },
      ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-modal-entrance">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {adminOnly
                ? isLogin
                  ? "Admin Sign In"
                  : "Admin Registration"
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full p-2"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required={!isLogin}
                  disabled={isLoading}
                  className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={isLoading}
                className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={isLoading}
                className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required={!isLogin}
                    disabled={isLoading}
                    className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, role: value })
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-amber-400">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-3">
                            <option.icon className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-gray-500">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  name: "",
                  role: adminOnly ? "admin" : "user",
                });
              }}
              disabled={isLoading}
              className="text-amber-600 hover:text-amber-700 transition-colors duration-300 disabled:opacity-50"
            >
              {adminOnly
                ? isLogin
                  ? "Don't have an admin account? Register"
                  : "Already have an admin account? Sign in"
                : isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
