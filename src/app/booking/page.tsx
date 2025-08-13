"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingCalendar from "@/components/booking-calendar";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "@/components/auth-modal";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    eventName: "",
    eventType: "",
    guestCount: "",
    contactName: "",
    contactPhone: "",
    specialRequests: "",
  });

  const { user } = useAuth();
  const router = useRouter();

  // Mock venue data - in real app this would come from props/params
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
            <div className="text-2xl font-bold text-amber-600">EventHalls</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Venue Info Sidebar */}
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
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="text-xs"
                      >
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

          {/* Booking Form */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Check Availability & Book Your Event
              </h1>

              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Select Date
                  </h3>
                  <BookingCalendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Select Time
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={
                            selectedTime === slot ? "default" : "outline"
                          }
                          className={`p-4 transition-all duration-300 ${
                            selectedTime === slot
                              ? "bg-amber-400 text-black hover:bg-amber-500 transform scale-105"
                              : "hover:scale-105"
                          }`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Event Details */}
                {selectedTime && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Event Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventName">Event Name *</Label>
                        <Input
                          id="eventName"
                          value={bookingDetails.eventName}
                          onChange={(e) =>
                            setBookingDetails({
                              ...bookingDetails,
                              eventName: e.target.value,
                            })
                          }
                          placeholder="e.g., Sarah & John's Wedding"
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select
                          onValueChange={(value) =>
                            setBookingDetails({
                              ...bookingDetails,
                              eventType: value,
                            })
                          }
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
                          setBookingDetails({
                            ...bookingDetails,
                            guestCount: e.target.value,
                          })
                        }
                        placeholder="Number of guests"
                        max={venue.capacity}
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 pt-4">
                      Contact Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="contactName">Full Name *</Label>
                        <Input
                          id="contactName"
                          value={
                            bookingDetails.contactName || user?.fullName || ""
                          }
                          onChange={(e) =>
                            setBookingDetails({
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
                            setBookingDetails({
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
                        <p className="text-xs text-gray-500 mt-1">
                          Using your account email
                        </p>
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
                          You'll need to create an account to complete the
                          booking
                        </p>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingDetails.specialRequests}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            specialRequests: e.target.value,
                          })
                        }
                        placeholder="Any special requirements or requests for your event..."
                        rows={4}
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div className="pt-6 border-t">
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                        disabled={
                          !selectedDate ||
                          !selectedTime ||
                          !bookingDetails.eventName
                        }
                      >
                        {user
                          ? `Proceed to Payment - $${venue.price}`
                          : `Sign In to Book - $${venue.price}`}
                      </Button>
                      {!user && (
                        <p className="text-center text-sm text-gray-600 mt-3">
                          Don't have an account? You'll be able to create one in
                          the next step.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        adminOnly={false}
        onSuccess={handleAuthSuccess} // Added success callback
      />
    </div>
  );
}
