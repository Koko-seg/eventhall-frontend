"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Building, User } from "lucide-react";
import { useRef, useState } from "react";

interface SignupSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAdmin: () => void;
  onSelectUser: () => void;
}

export default function SignupSelectionModal({
  isOpen,
  onClose,
  onSelectAdmin,
  onSelectUser,
}: SignupSelectionModalProps) {
  if (!isOpen) return null;

  const [isSignupSelectionOpen, setIsSignupSelectionOpen] = useState(false);
  const [isUserSignupOpen, setIsUserSignupOpen] = useState(false);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-2xl animate-modal-entrance">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Path
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600">
                How would you like to get started with EventHalls?
              </p>
            </div>

            {/* Admin Button */}
            <Button
              onClick={onSelectAdmin}
              className="w-full p-8 h-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <Building className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold mb-1">
                    Do you want to register your event hall?
                  </div>
                  <div className="text-sm opacity-90">
                    Create your venue profile and start hosting events
                  </div>
                </div>
              </div>
            </Button>

            {/* User Button */}
            <Button
              onClick={onSelectUser}
              className="w-full p-8 h-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <User className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold mb-1">
                    Are you looking for an event hall?
                  </div>
                  <div className="text-sm opacity-90">
                    Browse venues and book your perfect event space
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
