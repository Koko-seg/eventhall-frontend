"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { X } from "lucide-react";

import { useVenueFilteringContext } from "@/contexts/venue-filter-context";
// ... other imports

export const ExploreFilterSidebar = ({
  showFilters,
}: {
  showFilters: boolean;
}) => {
  const {
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
  } = useVenueFilteringContext();

  return (
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
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
  );
};
