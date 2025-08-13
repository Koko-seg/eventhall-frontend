"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "@/components/auth-modal";
import { BookingHeader } from "./components/BookingHeader";
import { VenueInfoSideBar } from "./components/VenueInfoSideBar";
import { BookingFormSection } from "./components/BookingFormSection";

export default function BookingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Navigation */}
      <BookingHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          <VenueInfoSideBar />

          <BookingFormSection />
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        adminOnly={false}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
