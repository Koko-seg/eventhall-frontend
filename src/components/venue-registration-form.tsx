"use client"

import type React from "react"
import { emailService } from "@/lib/email-service"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Upload, X, Wifi, Car, Camera, Music, Utensils, Star, ArrowLeft, Send } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface VenueRegistrationFormProps {
  onComplete: () => void
  onBack: () => void
}

export default function VenueRegistrationForm({ onComplete, onBack }: VenueRegistrationFormProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [venueData, setVenueData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    capacity: "",
    pricePerEvent: "",
    amenities: [] as string[],
    eventTypes: [] as string[],
    availableTimes: [] as string[],
    images: [] as File[],
    contactPhone: "",
    contactEmail: user?.email || "",
    businessLicense: "",
    specialFeatures: "",
  })

  const availableAmenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "av_equipment", label: "A/V Equipment", icon: Camera },
    { id: "sound_system", label: "Sound System", icon: Music },
    { id: "catering", label: "Catering Kitchen", icon: Utensils },
    { id: "bridal_suite", label: "Bridal Suite", icon: Star },
  ]

  const eventTypeOptions = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Conference",
    "Product Launch",
    "Graduation",
    "Anniversary",
    "Other",
  ]

  const timeSlotOptions = [
    "Morning (9:00 AM - 1:00 PM)",
    "Afternoon (2:00 PM - 6:00 PM)",
    "Evening (7:00 PM - 11:00 PM)",
    "All Day (9:00 AM - 11:00 PM)",
  ]

  const handleAmenityToggle = (amenityId: string) => {
    setVenueData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }))
  }

  const handleEventTypeToggle = (eventType: string) => {
    setVenueData((prev) => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter((type) => type !== eventType)
        : [...prev.eventTypes, eventType],
    }))
  }

  const handleTimeSlotToggle = (timeSlot: string) => {
    setVenueData((prev) => ({
      ...prev,
      availableTimes: prev.availableTimes.includes(timeSlot)
        ? prev.availableTimes.filter((time) => time !== timeSlot)
        : [...prev.availableTimes, timeSlot],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setVenueData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }))
    }
  }

  const removeImage = (index: number) => {
    setVenueData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const venueRegistration = {
      ...venueData,
      ownerId: user?.id,
      ownerName: user?.fullName,
      ownerEmail: user?.email,
      status: "pending_review",
      submittedAt: new Date().toISOString(),
      id: Date.now(),
    }

    // Save to localStorage for demo (in real app, this would be saved to database)
    const existingRegistrations = JSON.parse(localStorage.getItem("venueRegistrations") || "[]")
    existingRegistrations.push(venueRegistration)
    localStorage.setItem("venueRegistrations", JSON.stringify(existingRegistrations))

    // Send email notification to Super Admin
    try {
      const emailSent = await emailService.sendVenueRegistrationNotification({
        venueName: venueData.name,
        ownerName: user?.fullName || "",
        ownerEmail: user?.email || "",
        location: venueData.location,
        address: venueData.address,
        capacity: venueData.capacity,
        pricePerEvent: venueData.pricePerEvent,
        description: venueData.description,
        amenities: venueData.amenities,
        eventTypes: venueData.eventTypes,
        availableTimes: venueData.availableTimes,
        contactPhone: venueData.contactPhone,
        businessLicense: venueData.businessLicense,
        specialFeatures: venueData.specialFeatures,
        submittedAt: new Date().toISOString(),
      })

      if (emailSent) {
        console.log("Email notification sent successfully to Super Admin")
      } else {
        console.error("Failed to send email notification")
      }
    } catch (error) {
      console.error("Error sending email notification:", error)
    }

    onComplete()
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStep1Valid =
    venueData.name && venueData.location && venueData.address && venueData.capacity && venueData.pricePerEvent
  const isStep2Valid =
    venueData.amenities.length > 0 && venueData.eventTypes.length > 0 && venueData.availableTimes.length > 0
  const isStep3Valid = venueData.images.length > 0 && venueData.contactPhone

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Event Hall</h1>
        <p className="text-gray-600">Step 2: Tell us about your venue</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? "bg-amber-400 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-amber-400" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Let's start with the essentials about your venue</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="venueName">Venue Name *</Label>
                  <Input
                    id="venueName"
                    value={venueData.name}
                    onChange={(e) => setVenueData({ ...venueData, name: e.target.value })}
                    placeholder="e.g., Grand Ballroom Elite"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="venueLocation">City/Area *</Label>
                  <Input
                    id="venueLocation"
                    value={venueData.location}
                    onChange={(e) => setVenueData({ ...venueData, location: e.target.value })}
                    placeholder="e.g., Downtown District"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venueAddress">Full Address *</Label>
                <Input
                  id="venueAddress"
                  value={venueData.address}
                  onChange={(e) => setVenueData({ ...venueData, address: e.target.value })}
                  placeholder="123 Main Street, City, State, ZIP"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="venueDescription">Description</Label>
                <Textarea
                  id="venueDescription"
                  value={venueData.description}
                  onChange={(e) => setVenueData({ ...venueData, description: e.target.value })}
                  placeholder="Describe your venue, its atmosphere, and what makes it special..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="venueCapacity">Maximum Capacity (guests) *</Label>
                  <Input
                    id="venueCapacity"
                    type="number"
                    value={venueData.capacity}
                    onChange={(e) => setVenueData({ ...venueData, capacity: e.target.value })}
                    placeholder="e.g., 200"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="venuePrice">Price per Event ($) *</Label>
                  <Input
                    id="venuePrice"
                    type="number"
                    value={venueData.pricePerEvent}
                    onChange={(e) => setVenueData({ ...venueData, pricePerEvent: e.target.value })}
                    placeholder="e.g., 2500"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Account
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className="bg-amber-400 text-black hover:bg-amber-500"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Features & Services */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Features & Services</h2>
                <p className="text-gray-600">What amenities and services do you offer?</p>
              </div>

              <div>
                <Label className="text-lg font-semibold">Available Amenities *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {availableAmenities.map((amenity) => (
                    <Button
                      key={amenity.id}
                      type="button"
                      variant={venueData.amenities.includes(amenity.id) ? "default" : "outline"}
                      className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                        venueData.amenities.includes(amenity.id) ? "bg-amber-400 text-black hover:bg-amber-500" : ""
                      }`}
                      onClick={() => handleAmenityToggle(amenity.id)}
                    >
                      <amenity.icon className="w-6 h-6" />
                      <span className="text-sm">{amenity.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Suitable Event Types *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {eventTypeOptions.map((eventType) => (
                    <Button
                      key={eventType}
                      type="button"
                      variant={venueData.eventTypes.includes(eventType) ? "default" : "outline"}
                      className={`p-3 ${
                        venueData.eventTypes.includes(eventType) ? "bg-amber-400 text-black hover:bg-amber-500" : ""
                      }`}
                      onClick={() => handleEventTypeToggle(eventType)}
                    >
                      {eventType}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Available Time Slots *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {timeSlotOptions.map((timeSlot) => (
                    <Button
                      key={timeSlot}
                      type="button"
                      variant={venueData.availableTimes.includes(timeSlot) ? "default" : "outline"}
                      className={`p-3 ${
                        venueData.availableTimes.includes(timeSlot) ? "bg-amber-400 text-black hover:bg-amber-500" : ""
                      }`}
                      onClick={() => handleTimeSlotToggle(timeSlot)}
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className="bg-amber-400 text-black hover:bg-amber-500"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Images & Contact */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Images & Contact Information</h2>
                <p className="text-gray-600">Upload photos and provide contact details</p>
              </div>

              <div>
                <Label className="text-lg font-semibold">Venue Images * (minimum 3 photos)</Label>
                <div className="mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload high-quality photos of your venue</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("imageUpload")?.click()}
                    >
                      Choose Images
                    </Button>
                  </div>
                </div>

                {venueData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {venueData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Venue ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 p-1 h-8 w-8 bg-white"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    value={venueData.contactPhone}
                    onChange={(e) => setVenueData({ ...venueData, contactPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={venueData.contactEmail}
                    onChange={(e) => setVenueData({ ...venueData, contactEmail: e.target.value })}
                    className="mt-2"
                    disabled
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessLicense">Business License Number (optional)</Label>
                <Input
                  id="businessLicense"
                  value={venueData.businessLicense}
                  onChange={(e) => setVenueData({ ...venueData, businessLicense: e.target.value })}
                  placeholder="Enter your business license number"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="specialFeatures">Special Features or Notes</Label>
                <Textarea
                  id="specialFeatures"
                  value={venueData.specialFeatures}
                  onChange={(e) => setVenueData({ ...venueData, specialFeatures: e.target.value })}
                  placeholder="Any special features, policies, or additional information..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-semibold text-amber-800 mb-2">Review Process</h3>
                <p className="text-amber-700 text-sm">
                  Once you submit your venue registration, our Super Admin team will review your information within
                  24-48 hours. You'll receive an email notification with the approval status and any next steps.
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="submit"
                  disabled={!isStep3Valid}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
