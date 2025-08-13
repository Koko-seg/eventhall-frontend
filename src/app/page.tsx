"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Search } from "lucide-react";
import Link from "next/link";
import UserMenu from "@/components/user-menu";
import { useAuth } from "@/contexts/auth-context";
import SignupSelectionModal from "@/components/signup-selection-modal";
import UserSignupModal from "@/components/user-signup-modal";

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragVelocity, setDragVelocity] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroBlur, setHeroBlur] = useState(0);
  const [featuredOpacity, setFeaturedOpacity] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignupSelectionOpen, setIsSignupSelectionOpen] = useState(false);
  const [isUserSignupOpen, setIsUserSignupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // Using auth context instead of local state
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

  const featuredHalls = [
    {
      id: 1,
      name: "Grand Ballroom Elite",
      location: "Downtown District",
      capacity: 500,
      rating: 4.9,
      price: "$2,500",
      image: "/luxury-event-hall.png",
      tags: ["Wedding", "Corporate", "Luxury"],
    },
    {
      id: 2,
      name: "Modern Event Space",
      location: "Tech Quarter",
      capacity: 200,
      rating: 4.8,
      price: "$1,200",
      image: "/minimalist-event-space.png",
      tags: ["Corporate", "Launch", "Modern"],
    },
    {
      id: 3,
      name: "Garden Pavilion",
      location: "Botanical Gardens",
      capacity: 150,
      rating: 4.7,
      price: "$800",
      image: "/garden-pavilion-lights.png",
      tags: ["Wedding", "Outdoor", "Garden"],
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setDragOffset(startPos);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      const velocity = {
        x: e.clientX - lastMousePos.x,
        y: e.clientY - lastMousePos.y,
      };
      setDragVelocity(velocity);
      setLastMousePos({ x: e.clientX, y: e.clientY });

      containerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      containerRef.current.style.transition = "none";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.transition =
        "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
      containerRef.current.style.transform = "translate(0px, 0px) scale(1)";

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "transform 0.3s ease-out";
        }
      }, 800);
    }
  };

  const handleAdminSignup = () => {
    setIsSignupSelectionOpen(false);
    // Redirect to admin signup page
    window.location.href = "/admin-signup";
  };

  const handleUserSignup = () => {
    setIsSignupSelectionOpen(false);
    setIsUserSignupOpen(true);
  };

  const handleUserSignupSuccess = () => {
    // Redirect to explore page after successful user signup
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
            <div className="relative group w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 group-focus-within:text-amber-400 group-focus-within:scale-110" />
              <input
                type="text"
                placeholder="Search by location or venue type..."
                className="pl-10 sm:pl-12 pr-4 py-3 sm:py-4 w-full rounded-full bg-white/90 backdrop-blur-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-500 focus:bg-white focus:shadow-2xl transform hover:scale-105 focus:scale-105 text-sm sm:text-base"
              />
            </div>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-text-shimmer">
              Featured Venues
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 animate-fade-in-up-delay">
              Handpicked spaces for extraordinary events
            </p>
          </div>

          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 cursor-grab active:cursor-grabbing transition-all duration-300"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {featuredHalls.map((hall, index) => (
              <Link key={hall.id} href={`/venue/${hall.id}`} className="block">
                <Card
                  className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 animate-card-entrance cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={hall.image || "/placeholder.svg"}
                      alt={hall.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-4 right-4 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                      <Badge className="bg-amber-400 text-black font-semibold animate-bounce-in text-xs sm:text-sm">
                        <Star className="w-3 h-3 mr-1 fill-current animate-spin-slow" />
                        {hall.rating}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-black text-base sm:text-lg font-semibold animate-float shadow-lg">
                        View Details
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {hall.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3 transform group-hover:translate-x-2 transition-transform duration-300">
                      <MapPin className="w-4 h-4 mr-2 animate-pulse" />
                      <span className="text-sm sm:text-base">
                        {hall.location}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm sm:text-base">
                        Up to {hall.capacity} guests
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hall.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs transform hover:scale-110 transition-all duration-300 animate-tag-entrance"
                          style={{
                            animationDelay: `${index * 0.2 + tagIndex * 0.1}s`,
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-bold text-emerald-600 animate-price-pulse">
                        {hall.price}
                      </span>
                      <Button
                        className="bg-black text-white hover:bg-gray-800 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 group-hover:animate-bounce active:scale-95 text-xs sm:text-sm px-3 sm:px-4 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/venue/${hall.id}`;
                        }}
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin-slow" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-black text-white animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div
              className="animate-counter-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-2 animate-number-count">
                500+
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                Premium Venues
              </div>
            </div>
            <div
              className="animate-counter-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-2 animate-number-count">
                10K+
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                Events Hosted
              </div>
            </div>
            <div
              className="animate-counter-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-2 animate-number-count">
                98%
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                Client Satisfaction
              </div>
            </div>
            <div
              className="animate-counter-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-2 animate-number-count">
                24/7
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 sm:py-12 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="animate-fade-in-left sm:col-span-2 md:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-4">
                EventHalls
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Your premier destination for exceptional event venues.
              </p>
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                  >
                    Explore Venues
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Support
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Connect
              </h4>
              <p className="text-gray-400 text-sm sm:text-base">
                Follow us for the latest updates and venue spotlights.
              </p>
            </div>
          </div>
        </div>
      </footer>

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
