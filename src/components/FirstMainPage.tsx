"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FirstMainPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroBlur, setHeroBlur] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [featuredOpacity, setFeaturedOpacity] = useState(0);

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
  return (
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
          <Link href="/explore" className="w-full max-w-xs">
            <Button className="bg-amber-400 text-black hover:bg-amber-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/50 animate-pulse-glow active:scale-95 w-full">
              Explore Venues
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
