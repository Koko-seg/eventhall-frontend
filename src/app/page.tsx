"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import SignupSelectionModal from "@/components/signup-selection-modal";
import UserSignupModal from "@/components/user-signup-modal";
import { Footer } from "@/components/Footer";
import { EventHallCardSection } from "@/components/EventHallCardSection";
import { Header } from "@/components/Header";
import { FirstMainPage } from "@/components/FirstMainPage";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [heroBlur, setHeroBlur] = useState(0);
  const [featuredOpacity, setFeaturedOpacity] = useState(0);
  const [isSignupSelectionOpen, setIsSignupSelectionOpen] = useState(false);
  const [isUserSignupOpen, setIsUserSignupOpen] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      setScrollY(scrollPosition);

      const blurAmount = Math.min((scrollPosition / windowHeight) * 10, 10);
      setHeroBlur(blurAmount);

      const featuredStart = windowHeight * 0.3;
      const featuredEnd = windowHeight * 0.8;
      const opacity = Math.max(
        0,
        Math.min(
          1,
          (scrollPosition - featuredStart) / (featuredEnd - featuredStart)
        )
      );
      setFeaturedOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const handleSuperAdminAccess = () => {
    setIsSignupSelectionOpen(false);
    // Redirect directly to super admin page with email verification
    window.location.href = "/super-admin";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 overflow-x-hidden">
      <Header onSignUpClick={() => setIsSignupSelectionOpen(true)} />
      <FirstMainPage />

      <section
        ref={featuredRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ease-out"
        style={{
          opacity: featuredOpacity,
          transform: `translateY(${(1 - featuredOpacity) * 50}px)`,
        }}
      >
        <EventHallCardSection />
      </section>
      <Footer />
      <SignupSelectionModal
        isOpen={isSignupSelectionOpen}
        onClose={() => setIsSignupSelectionOpen(false)}
        onSelectAdmin={handleAdminSignup}
        onSelectUser={handleUserSignup}
        onSelectSuperAdmin={handleSuperAdminAccess}
      />

      <UserSignupModal
        isOpen={isUserSignupOpen}
        onClose={() => setIsUserSignupOpen(false)}
        onSuccess={handleUserSignupSuccess}
      />
    </div>
  );
}
