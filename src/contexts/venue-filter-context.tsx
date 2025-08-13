// contexts/venue-filter-context.tsx

import React, { createContext, useContext, ReactNode } from "react";
// Adjust the path as needed
import { type Venue } from "@/components/../data/mockData";
import { ExploreVenueFiltering } from "@/app/explore/components/ExploreVenueFiltering";

// Define the shape of the context data
interface VenueFilteringContextType {
  filteredVenues: Venue[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  locations: string[];
  eventTypes: string[];
  amenities: string[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedEventTypes: string[];
  toggleEventType: (type: string) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
  capacityRange: number[];
  setCapacityRange: (range: number[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  clearFilters: () => void;
}

// Create the context
const VenueFilteringContext = createContext<
  VenueFilteringContextType | undefined
>(undefined);

// Create a custom hook to use the context
export const useVenueFilteringContext = () => {
  const context = useContext(VenueFilteringContext);
  if (context === undefined) {
    throw new Error(
      "useVenueFilteringContext must be used within a VenueFilteringProvider"
    );
  }
  return context;
};

// Create the provider component
export const VenueFilteringProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const filteringProps = ExploreVenueFiltering();
  return (
    <VenueFilteringContext.Provider value={filteringProps}>
      {children}
    </VenueFilteringContext.Provider>
  );
};
