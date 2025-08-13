"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  User,
  Building,
  Shield,
  LogOut,
  Settings,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Building;
      case "super_admin":
        return Shield;
      default:
        return User;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Venue Owner";
      case "super_admin":
        return "Super Admin";
      default:
        return "Event Organizer";
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center space-x-2 text-white hover:text-amber-400 transition-all duration-300"
      >
        <RoleIcon className="w-4 h-4" />
        <span>{user.fullName}</span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-full mt-2 w-64 bg-white shadow-2xl z-50 animate-dropdown-entrance">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                  <RoleIcon className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getRoleLabel(user.role)}
                  </div>
                  {user.status === "pending" && (
                    <div className="text-xs text-orange-500 font-medium">
                      Pending Approval
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {user.role === "user" && (
                  <Link href="/my-bookings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-gray-100"
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      My Bookings
                    </Button>
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-gray-100"
                    >
                      <Building className="w-4 h-4 mr-3" />
                      My Venues
                    </Button>
                  </Link>
                )}

                {user.role === "super_admin" && (
                  <Link href="/super-admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-gray-100"
                    >
                      <Shield className="w-4 h-4 mr-3" />
                      Admin Panel
                    </Button>
                  </Link>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>

                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
