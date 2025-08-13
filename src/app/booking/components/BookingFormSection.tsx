// components/BookingFormSection.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "@/components/auth-modal";

import { type Venue } from "@/components/../data/mockData";
import { BookingDateTimeSection } from "./BookingDateTime";
import { BookingEventDetailsSection } from "./BookingEventDetail";
import { BookingContactInfoSection } from "./BookingContactInfo";

// You can define the types here or in a separate file if needed
interface BookingDetails {
  eventName: string;
  eventType: string;
  guestCount: string;
  contactName: string;
  contactPhone: string;
  specialRequests: string;
}

// Define the partial type for the details object.
// This is used for the onDetailsChange handlers to allow partial state updates.
interface BookingDetailsPartial {
  eventName?: string;
  eventType?: string;
  guestCount?: string;
  contactName?: string;
  contactPhone?: string;
  specialRequests?: string;
}

export const BookingFormSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    eventName: "",
    eventType: "",
    guestCount: "",
    contactName: "",
    contactPhone: "",
    specialRequests: "",
  });

  const { user } = useAuth();
  const router = useRouter();

  // Mock venue data - in a real app this would come from a backend or a parent component
  const venue: Venue = {
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
    eventTypes: [],
    tags: [],
    description: "",
  };

  const timeSlots = [
    "9:00 AM - 1:00 PM",
    "2:00 PM - 6:00 PM",
    "7:00 PM - 11:00 PM",
    "All Day (9:00 AM - 11:00 PM)",
  ];

  const eventTypes = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Anniversary",
    "Conference",
    "Product Launch",
    "Graduation",
    "Other",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDate && selectedTime && bookingDetails.eventName) {
      const bookingData = {
        venue,
        selectedDate: selectedDate.toISOString(),
        selectedTime,
        bookingDetails: {
          ...bookingDetails,
          contactEmail: user?.email || "",
          contactName: bookingDetails.contactName || user?.fullName || "",
        },
        user: user
          ? {
              id: user.id,
              email: user.email,
              fullName: user.fullName,
            }
          : null,
        totalAmount: venue.price,
      };

      // In a real app, this would be an API call to save the booking
      // For now, we'll store it in localStorage as a temporary placeholder
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

      if (!user) {
        setShowAuthModal(true);
        return;
      }

      router.push("/payment");
    }
  };

  const handleAuthSuccess = () => {
    // After successful login, redirect to payment
    router.push("/payment");
  };

  return (
    <div className="lg:col-span-3">
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Check Availability & Book Your Event
        </h1>

        <form onSubmit={handleBookingSubmit} className="space-y-8">
          <BookingDateTimeSection
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            timeSlots={timeSlots}
          />

          {selectedTime && (
            <>
              <BookingEventDetailsSection
                bookingDetails={{
                  eventName: bookingDetails.eventName,
                  eventType: bookingDetails.eventType,
                  guestCount: bookingDetails.guestCount,
                }}
                onDetailsChange={(details: BookingDetailsPartial) =>
                  setBookingDetails((prev) => ({ ...prev, ...details }))
                }
                eventTypes={eventTypes}
                venue={venue}
              />
              <BookingContactInfoSection
                bookingDetails={{
                  contactName: bookingDetails.contactName,
                  contactPhone: bookingDetails.contactPhone,
                  specialRequests: bookingDetails.specialRequests,
                }}
                onDetailsChange={(details: BookingDetailsPartial) =>
                  setBookingDetails((prev) => ({ ...prev, ...details }))
                }
              />
            </>
          )}

          <div className="pt-6 border-t">
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              disabled={
                !selectedDate || !selectedTime || !bookingDetails.eventName
              }
            >
              {user
                ? `Proceed to Payment - $${venue.price}`
                : `Sign In to Book - $${venue.price}`}
            </Button>
            {!user && (
              <p className="text-center text-sm text-gray-600 mt-3">
                Don't have an account? You'll be able to create one in the next
                step.
              </p>
            )}
          </div>
        </form>
      </Card>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          adminOnly={false}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};
