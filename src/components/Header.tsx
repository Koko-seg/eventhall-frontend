import { Button } from "@/components/ui/button";
import Link from "next/link";
import type React from "react";
import { useState, useRef } from "react";
import UserMenu from "./user-menu";
import { useAuth } from "@/contexts/auth-context";

interface HeaderProps {
  onSignUpClick: () => void;
}

export const Header = ({ onSignUpClick }: HeaderProps) => {
  const [isSignupSelectionOpen, setIsSignupSelectionOpen] = useState(false);
  const [isUserSignupOpen, setIsUserSignupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleAdminSignup = () => {
    setIsSignupSelectionOpen(false);
    window.location.href = "/admin-signup";
  };

  const handleUserSignup = () => {
    setIsSignupSelectionOpen(false);
    setIsUserSignupOpen(true);
  };

  const handleUserSignupSuccess = () => {
    window.location.href = "/explore";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-amber-200/20 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-amber-400 animate-fade-in-left">
            EventHalls
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 animate-fade-in-right">
            <Link
              href="/explore"
              className="text-white hover:text-amber-400 transition-all duration-500 hover:scale-110 transform hover:-translate-y-1 text-sm sm:text-base"
            >
              Explore
            </Link>
            {user ? (
              <UserMenu />
            ) : (
              <Button
                onClick={onSignUpClick}
                className="bg-amber-400 text-black hover:bg-amber-500 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/50 active:scale-95 text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
