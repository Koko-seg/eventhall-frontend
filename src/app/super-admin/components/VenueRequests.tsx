"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { XCircle, Eye, Search, Filter, MapPin, Building2 } from "lucide-react";

export const VenueRequests = () => {
  const [isVerified, setIsVerified] = useState(false);

  const [pendingVenues, setPendingVenues] = useState<any[]>([]);

  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  const handleApproveVenue = (venueId: number) => {
    const adminVenues = JSON.parse(localStorage.getItem("adminVenues") || "[]");
    const venueRegistrations = JSON.parse(
      localStorage.getItem("venueRegistrations") || "[]"
    );

    const updatedAdminVenues = adminVenues.map((v: any) =>
      v.id === venueId
        ? { ...v, status: "approved", approvedAt: new Date().toISOString() }
        : v
    );
    const updatedVenueRegistrations = venueRegistrations.map((v: any) =>
      v.id === venueId
        ? { ...v, status: "approved", approvedAt: new Date().toISOString() }
        : v
    );

    localStorage.setItem("adminVenues", JSON.stringify(updatedAdminVenues));
    localStorage.setItem(
      "venueRegistrations",
      JSON.stringify(updatedVenueRegistrations)
    );
    setPendingVenues(pendingVenues.filter((venue) => venue.id !== venueId));
    setSelectedVenue(null);
  };

  return (
    <TabsContent value="pending-venues" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Pending Venue Approvals
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search venues..." className="pl-10 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {pendingVenues.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Pending Venue Approvals
          </h3>
          <p className="text-gray-600">
            All venue submissions have been reviewed.
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingVenues.map((venue) => (
            <Card
              key={venue.id}
              className="overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={venue.images?.[0] || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-yellow-100 text-yellow-800">
                  Pending Review
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {venue.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center mb-4">
                  <MapPin className="w-3 h-3 mr-1" />
                  {venue.location}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{venue.capacity} guests</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      ${venue.pricePerEvent || venue.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium">
                      {new Date(
                        venue.createdAt || venue.submittedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedVenue(venue)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApproveVenue(venue.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedVenue(venue)}
                    variant="outline"
                    className="text-red-600 border-red-200"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </TabsContent>
  );
};
