"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserMenu from "@/components/user-menu";
import { useAuth } from "@/contexts/auth-context";
import SignupSelectionModal from "@/components/signup-selection-modal";
import UserSignupModal from "@/components/user-signup-modal";
import { Footer } from "@/components/Footer";
import { EventHallCart } from "@/components/EventHallCart";
import { EventHallCardSection } from "@/components/EventHallCardSection";

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroBlur, setHeroBlur] = useState(0);
  const [featuredOpacity, setFeaturedOpacity] = useState(0);
  const [isSignupSelectionOpen, setIsSignupSelectionOpen] = useState(false);
  const [isUserSignupOpen, setIsUserSignupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 overflow-x-hidden">
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
                  onClick={() => setIsSignupSelectionOpen(true)}
                  className="bg-amber-400 text-black hover:bg-amber-500 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/50 active:scale-95 text-xs sm:text-sm px-3 sm:px-4 py-2"
                >
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0"
        style={{
          filter: `blur(${heroBlur}px)`,
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "filter 0.3s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 animate-fade-in"></div>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out animate-zoom-in"
          style={{
            backgroundImage: "url('/elegant-ballroom.png')",
            transform: isDragging ? "scale(1.05)" : "scale(1)",
          }}
        ></div>

        <div
          className={`relative z-20 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${
            isVisible ? "animate-hero-entrance" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight animate-text-reveal">
            Find Your
            <span className="block text-amber-400 animate-text-reveal-delay">
              Perfect Venue
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 animate-fade-in-up-delay px-4">
            Discover extraordinary event halls for unforgettable moments
          </p>

          <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 animate-search-entrance px-4">
            {/* <div className="relative group w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 group-focus-within:text-amber-400 group-focus-within:scale-110" />
              <input
                type="text"
                placeholder="Search by location or venue type..."
                className="pl-10 sm:pl-12 pr-4 py-3 sm:py-4 w-full rounded-full bg-white/90 backdrop-blur-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-500 focus:bg-white focus:shadow-2xl transform hover:scale-105 focus:scale-105 text-sm sm:text-base"
              />
            </div> */}
            <Link href="/explore" className="w-full max-w-xs">
              <Button className="bg-amber-400 text-black hover:bg-amber-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/50 animate-pulse-glow active:scale-95 w-full">
                Explore Venues
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
      />

      <UserSignupModal
        isOpen={isUserSignupOpen}
        onClose={() => setIsUserSignupOpen(false)}
        onSuccess={handleUserSignupSuccess}
      />
    </div>
  );
}
