import { useState, useMemo } from "react";
import { allVenues, type Venue } from "@/components/../data/mockData";

export const ExploreVenueFiltering = () => {
  // State for search and display
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");

  // State for filters
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);

  // Pre-computed filter options
  const locations: string[] = useMemo(
    () => [...new Set(allVenues.map((venue) => venue.location))],
    []
  );

  const eventTypes: string[] = useMemo(
    () => [...new Set(allVenues.flatMap((venue) => venue.eventTypes))],
    []
  );

  const amenities: string[] = useMemo(
    () => [...new Set(allVenues.flatMap((venue) => venue.amenities))],
    []
  );

  // Filter and sort logic
  const filteredVenues = useMemo(() => {
    const filtered = allVenues.filter((venue) => {
      // Search query filter
      if (
        searchQuery &&
        !venue.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !venue.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !venue.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }
      // Location filter
      if (selectedLocation && venue.location !== selectedLocation) {
        return false;
      }
      // Event type filter
      if (
        selectedEventTypes.length > 0 &&
        !selectedEventTypes.some((type) => venue.eventTypes.includes(type))
      ) {
        return false;
      }
      // Amenities filter
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.some((amenity) => venue.amenities.includes(amenity))
      ) {
        return false;
      }
      // Capacity filter
      if (
        venue.capacity < capacityRange[0] ||
        venue.capacity > capacityRange[1]
      ) {
        return false;
      }
      // Price filter
      if (venue.price < priceRange[0] || venue.price > priceRange[1]) {
        return false;
      }
      // Rating filter
      if (venue.rating < minRating) {
        return false;
      }
      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "capacity":
          return b.capacity - a.capacity;
        case "rating":
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedLocation,
    selectedEventTypes,
    selectedAmenities,
    capacityRange,
    priceRange,
    minRating,
    sortBy,
  ]);

  // Handler functions
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedEventTypes([]);
    setSelectedAmenities([]);
    setCapacityRange([0, 1000]);
    setPriceRange([0, 5000]);
    setMinRating(0);
  };

  const toggleEventType = (eventType: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((type) => type !== eventType)
        : [...prev, eventType]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return {
    filteredVenues,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    locations,
    eventTypes,
    amenities,
    selectedLocation,
    setSelectedLocation,
    selectedEventTypes,
    toggleEventType,
    selectedAmenities,
    toggleAmenity,
    capacityRange,
    setCapacityRange,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    clearFilters,
  };
};
