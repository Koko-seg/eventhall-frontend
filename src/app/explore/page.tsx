"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "@/components/auth-modal";
import { type Venue } from "@/components/../data/mockData";
import { ExploreHeader } from "./components/ExploreHeader";
import { ExploreSearchSection } from "./components/ExploreSearchSection";
import { ExploreFilterSidebar } from "./components/ExploreFilterSideBar";
import { VenueResults } from "./components/ExploreFilterResults";
import { VenueFilteringProvider } from "@/contexts/venue-filter-context";

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedVenueForBooking, setSelectedVenueForBooking] =
    useState<Venue | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const router = useRouter();
  const { user } = useAuth();

  const toggleFavorite = (venueId: number) => {
    setFavorites((prev) =>
      prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId]
    );
  };

  const handleBookNow = (venue: Venue) => {
    if (!user) {
      setSelectedVenueForBooking(venue);
      setShowAuthModal(true);
    } else {
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
    <VenueFilteringProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <ExploreHeader />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ExploreSearchSection />
          <div className="flex gap-8">
            <ExploreFilterSidebar showFilters={showFilters} />
            <VenueResults
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleBookNow={handleBookNow}
            />
          </div>
        </div>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => {
              setShowAuthModal(false);
              setSelectedVenueForBooking(null);
            }}
            adminOnly={false}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </VenueFilteringProvider>
  );
}
