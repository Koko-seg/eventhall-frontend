"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { allVenues, type Venue } from "@/components/../data/mockData";

export const ExploreHeader = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedVenueForBooking, setSelectedVenueForBooking] =
    useState<Venue | null>(null);

  const router = useRouter();
  const { user } = useAuth();

  const handleBookNow = (venue: Venue) => {
    if (!user) {
      setSelectedVenueForBooking(venue);
      setShowAuthModal(true);
    } else {
      // Store selected venue and redirect to booking
      localStorage.setItem("selectedVenue", JSON.stringify(venue));
      router.push("/booking");
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (selectedVenueForBooking) {
      localStorage.setItem(
        "selectedVenue",
        JSON.stringify(selectedVenueForBooking)
      );
      router.push("/booking");
      setSelectedVenueForBooking(null);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-gray-900 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-2xl font-bold text-amber-600">EventSpace</div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Welcome, {user.fullName}
                </span>
                <Button variant="outline" size="sm">
                  My Bookings
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
