"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star } from "lucide-react";

export const VenueInfoSideBar = () => {
  const venue = {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Downtown District",
    capacity: 500,
    rating: 4.9,
    price: 2500,
    image: "/luxury-event-hall.png",
    amenities: [
      "Full Kitchen",
      "A/V Equipment",
      "Parking",
      "Bridal Suite",
      "Dance Floor",
    ],
  };
  return (
    <div className="lg:col-span-2">
      <Card className="sticky top-24">
        <div className="relative">
          <img
            src={venue.image || "/placeholder.svg"}
            alt={venue.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-4 right-4 bg-amber-400 text-black">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {venue.rating}
          </Badge>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {venue.name}
          </h2>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{venue.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <Users className="w-4 h-4 mr-2" />
            <span>Up to {venue.capacity} guests</span>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Starting at</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${venue.price}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
