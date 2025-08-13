// components/BookingContactInfoSection.tsx

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";

interface BookingDetails {
  contactName: string;
  contactPhone: string;
  specialRequests: string;
}

interface BookingContactInfoSectionProps {
  bookingDetails: BookingDetails;
  onDetailsChange: (details: BookingDetails) => void;
}

export const BookingContactInfoSection = ({
  bookingDetails,
  onDetailsChange,
}: BookingContactInfoSectionProps) => {
  const { user } = useAuth();

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-900 pt-4">
        Contact Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contactName">Full Name *</Label>
          <Input
            id="contactName"
            value={bookingDetails.contactName || user?.fullName || ""}
            onChange={(e) =>
              onDetailsChange({
                ...bookingDetails,
                contactName: e.target.value,
              })
            }
            placeholder="Your full name"
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <Label htmlFor="contactPhone">Phone Number</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={bookingDetails.contactPhone}
            onChange={(e) =>
              onDetailsChange({
                ...bookingDetails,
                contactPhone: e.target.value,
              })
            }
            placeholder="Your phone number"
            className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {user ? (
        <div>
          <Label htmlFor="contactEmail">Email Address</Label>
          <Input
            id="contactEmail"
            type="email"
            value={user.email || ""}
            disabled
            className="bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Using your account email</p>
        </div>
      ) : (
        <div>
          <Label htmlFor="contactEmail">Email Address *</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="your.email@example.com"
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
          />
          <p className="text-xs text-amber-600 mt-1">
            You'll need to create an account to complete the booking
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          value={bookingDetails.specialRequests}
          onChange={(e) =>
            onDetailsChange({
              ...bookingDetails,
              specialRequests: e.target.value,
            })
          }
          placeholder="Any special requirements or requests for your event..."
          rows={4}
          className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
        />
      </div>
    </>
  );
};
