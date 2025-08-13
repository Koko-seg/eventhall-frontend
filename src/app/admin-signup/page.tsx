"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building2, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import VenueRegistrationForm from "@/components/venue-registration-form";

export default function AdminSignupPage() {
  const [showAuthModal, setShowAuthModal] = useState(false); // Start as false, will be set based on auth state
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (user && (user.role === "admin" || user.role === "super_admin")) {
        // User is already authenticated as admin, go to venue form
        setShowVenueForm(true);
        setShowAuthModal(false);
      } else {
        // User not authenticated or not admin, show auth modal
        setShowAuthModal(true);
        setShowVenueForm(false);
      }
      setIsLoading(false);
    }
  }, [user, authLoading]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowVenueForm(true);
  };

  const handleVenueRegistrationComplete = () => {
    setShowVenueForm(false);
    setRegistrationComplete(true);
  };

  const handleClose = () => {
    router.push("/signup");
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Registration Submitted Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for registering your event hall with EventSpace. Your
            venue details have been sent to our Super Admin team for review.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-amber-800 mb-2">
              What happens next?
            </h3>
            <ul className="text-left text-amber-700 space-y-2">
              <li>
                • Our Super Admin team will review your venue details within
                24-48 hours
              </li>
              <li>
                • You'll receive an email notification once your venue is
                approved or if we need additional information
              </li>
              <li>
                • Once approved, your venue will be visible to customers on our
                platform
              </li>
              <li>
                • You'll gain access to your full venue management dashboard
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/admin")}
              className="bg-amber-400 text-black hover:bg-amber-500"
            >
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Return to Homepage
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/signup")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Options</span>
        </Button>
      </div>

      {/* Step Indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              !showVenueForm
                ? "bg-amber-400 text-white"
                : "bg-green-400 text-white"
            }`}
          >
            1
          </div>
          <div className="w-8 border-t border-gray-300"></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              showVenueForm
                ? "bg-amber-400 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Venue Owner Registration
            </h1>
            <p className="text-gray-600">Step 1: Create your account</p>
          </div>
          <AuthModal
            isOpen={showAuthModal}
            onClose={handleClose}
            adminOnly={true}
            onSuccess={handleAuthSuccess}
            defaultToSignup={true} // Added prop to show signup form directly
          />
        </div>
      )}

      {showVenueForm && (
        <VenueRegistrationForm
          onComplete={handleVenueRegistrationComplete}
          onBack={() => {
            setShowVenueForm(false);
            setShowAuthModal(true);
          }}
        />
      )}
    </div>
  );
}
