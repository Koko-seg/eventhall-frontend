// components/VenueResults.tsx

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Grid3X3,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { type Venue } from "@/components/../data/mockData";
import { useVenueFilteringContext } from "@/contexts/venue-filter-context";

interface VenueResultsProps {
  favorites: number[];
  toggleFavorite: (venueId: number) => void;
  handleBookNow: (venue: Venue) => void;
}

export const VenueResults = ({
  favorites,
  toggleFavorite,
  handleBookNow,
}: VenueResultsProps) => {
  const { filteredVenues, viewMode, clearFilters } = useVenueFilteringContext();

  return (
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
                  <span className="text-sm">Up to {venue.capacity} guests</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {venue.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {venue.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
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
                    <Button variant="outline" className="w-full bg-transparent">
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
                  <p className="text-gray-600 mb-4">{venue.description}</p>
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
  );
};
