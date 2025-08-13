"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Grid3X3,
  List,
  MapPin,
  Users,
  Star,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "@/components/auth-modal";

interface Venue {
  id: number;
  name: string;
  location: string;
  capacity: number;
  rating: number;
  price: number;
  image: string;
  tags: string[];
  amenities: string[];
  eventTypes: string[];
  description: string;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedVenueForBooking, setSelectedVenueForBooking] =
    useState<Venue | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const router = useRouter();
  const { user } = useAuth();

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);

  // Mock venue data
  const allVenues: Venue[] = [
    {
      id: 1,
      name: "Grand Ballroom Elite",
      location: "Downtown District",
      capacity: 500,
      rating: 4.9,
      price: 2500,
      image: "/luxury-event-hall.png",
      tags: ["Wedding", "Corporate", "Luxury"],
      amenities: [
        "Full Kitchen",
        "A/V Equipment",
        "Parking",
        "Bridal Suite",
        "Dance Floor",
      ],
      eventTypes: ["Wedding", "Corporate", "Gala"],
      description:
        "Elegant ballroom with crystal chandeliers and marble floors",
    },
    {
      id: 2,
      name: "Modern Event Space",
      location: "Tech Quarter",
      capacity: 200,
      rating: 4.8,
      price: 1200,
      image: "/minimalist-event-space.png",
      tags: ["Corporate", "Launch", "Modern"],
      amenities: [
        "A/V Equipment",
        "High-Speed WiFi",
        "Catering Kitchen",
        "Parking",
      ],
      eventTypes: ["Corporate", "Product Launch", "Conference"],
      description: "Sleek contemporary space with floor-to-ceiling windows",
    },
    {
      id: 3,
      name: "Garden Pavilion",
      location: "Botanical Gardens",
      capacity: 150,
      rating: 4.7,
      price: 800,
      image: "/garden-pavilion-lights.png",
      tags: ["Wedding", "Outdoor", "Garden"],
      amenities: [
        "Outdoor Setting",
        "Garden Views",
        "Catering Kitchen",
        "Parking",
      ],
      eventTypes: ["Wedding", "Birthday", "Anniversary"],
      description: "Charming outdoor pavilion surrounded by lush gardens",
    },
    {
      id: 4,
      name: "Historic Manor Hall",
      location: "Heritage District",
      capacity: 300,
      rating: 4.6,
      price: 1800,
      image: "/elegant-ballroom.png",
      tags: ["Wedding", "Historic", "Elegant"],
      amenities: [
        "Historic Architecture",
        "Full Kitchen",
        "Bridal Suite",
        "Parking",
        "Piano",
      ],
      eventTypes: ["Wedding", "Anniversary", "Gala"],
      description: "Victorian-era manor with original architectural details",
    },
    {
      id: 5,
      name: "Rooftop Terrace",
      location: "City Center",
      capacity: 120,
      rating: 4.5,
      price: 1500,
      image: "/rooftop-terrace-city-view.png",
      tags: ["Modern", "Outdoor", "City Views"],
      amenities: ["City Views", "Outdoor Setting", "Bar", "A/V Equipment"],
      eventTypes: ["Corporate", "Birthday", "Cocktail Party"],
      description: "Stunning rooftop venue with panoramic city views",
    },
    {
      id: 6,
      name: "Industrial Loft",
      location: "Arts District",
      capacity: 180,
      rating: 4.4,
      price: 900,
      image: "/industrial-loft-exposed-brick.png",
      tags: ["Industrial", "Modern", "Artistic"],
      amenities: ["Exposed Brick", "High Ceilings", "A/V Equipment", "Parking"],
      eventTypes: ["Corporate", "Art Show", "Product Launch"],
      description:
        "Converted warehouse with exposed brick and industrial charm",
    },
  ];

  const locations: string[] = [
    ...new Set(allVenues.map((venue) => venue.location)),
  ];
  const eventTypes: string[] = [
    ...new Set(allVenues.flatMap((venue) => venue.eventTypes)),
  ];
  const amenities: string[] = [
    ...new Set(allVenues.flatMap((venue) => venue.amenities)),
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Navigation */}
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Venue
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing event spaces for weddings, corporate events,
            parties, and more
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search venues, locations, or event types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="capacity">Largest Capacity</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-80 space-y-6`}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {/* Location Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Location</Label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Capacity Range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Capacity: {capacityRange[0]} - {capacityRange[1]} guests
                </Label>
                <Slider
                  value={capacityRange}
                  onValueChange={setCapacityRange}
                  max={1000}
                  min={0}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Minimum Rating</Label>
                <Select
                  value={minRating.toString()}
                  onValueChange={(value) => setMinRating(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any rating</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.8">4.8+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Types */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Event Types</Label>
                <div className="space-y-2">
                  {eventTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedEventTypes.includes(type)}
                        onCheckedChange={() => toggleEventType(type)}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Amenities</Label>
                <div className="space-y-2">
                  {amenities.slice(0, 6).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredVenues.length} venue
                {filteredVenues.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-amber-400 text-black font-semibold">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {venue.rating}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/80 hover:bg-white p-2 h-8 w-8"
                          onClick={() => toggleFavorite(venue.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(venue.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/80 hover:bg-white p-2 h-8 w-8"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {venue.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          Up to {venue.capacity} guests
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {venue.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {venue.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-emerald-600">
                          ${venue.price}
                        </span>
                        <span className="text-sm text-gray-500">per event</span>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/venue/${venue.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            View Details
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleBookNow(venue)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVenues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6">
                      <div className="relative">
                        <img
                          src={venue.image || "/placeholder.svg"}
                          alt={venue.name}
                          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-6 w-6"
                          onClick={() => toggleFavorite(venue.id)}
                        >
                          <Heart
                            className={`w-3 h-3 ${
                              favorites.includes(venue.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {venue.name}
                          </h3>
                          <Badge className="bg-amber-400 text-black font-semibold">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {venue.rating}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{venue.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              Up to {venue.capacity} guests
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">
                          {venue.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {venue.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-emerald-600">
                              ${venue.price}
                            </span>
                            <div className="flex gap-2">
                              <Link href={`/venue/${venue.id}`}>
                                <Button variant="outline">View Details</Button>
                              </Link>
                              <Button
                                onClick={() => handleBookNow(venue)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No venues found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
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
  );
}
