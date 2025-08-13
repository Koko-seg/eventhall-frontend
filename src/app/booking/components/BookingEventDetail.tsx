// components/BookingEventDetailsSection.tsx

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Venue } from "@/components/../data/mockData";

interface BookingDetails {
  eventName: string;
  eventType: string;
  guestCount: string;
}

interface BookingEventDetailsSectionProps {
  bookingDetails: BookingDetails;
  onDetailsChange: (details: {
    eventName?: string;
    eventType?: string;
    guestCount?: string;
  }) => void;
  eventTypes: string[];
  venue: Venue;
}

export const BookingEventDetailsSection = ({
  bookingDetails,
  onDetailsChange,
  eventTypes,
  venue,
}: BookingEventDetailsSectionProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onDetailsChange({ ...bookingDetails, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    onDetailsChange({ ...bookingDetails, eventType: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Event Details</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="eventName">Event Name *</Label>
          <Input
            id="eventName"
            value={bookingDetails.eventName}
            onChange={(e) =>
              onDetailsChange({ ...bookingDetails, eventName: e.target.value })
            }
            placeholder="e.g., Sarah & John's Wedding"
            required
            className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <Label htmlFor="eventType">Event Type</Label>
          <Select
            onValueChange={handleSelectChange}
            value={bookingDetails.eventType}
          >
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-amber-400">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="guestCount">Expected Guest Count</Label>
        <Input
          id="guestCount"
          type="number"
          value={bookingDetails.guestCount}
          onChange={(e) =>
            onDetailsChange({ ...bookingDetails, guestCount: e.target.value })
          }
          placeholder="Number of guests"
          max={venue.capacity}
          className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
        />
      </div>
    </div>
  );
};
