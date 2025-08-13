"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Users,
  Star,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Wifi,
  Car,
  Utensils,
  Music,
  Camera,
  Shield,
  Clock,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  MessageCircle,
  Award,
  Zap,
  CheckCircle,
  X,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Venue {
  id: number
  name: string
  location: string
  address: string
  capacity: number
  rating: number
  reviewCount: number
  price: number
  images: string[]
  videos?: string[]
  description: string
  longDescription: string
  amenities: Array<{ name: string; icon: any; description: string }>
  eventTypes: string[]
  policies: string[]
  contact: {
    phone: string
    email: string
    manager: string
    responseTime: string
  }
  availability: string[]
  features: string[]
  awards: string[]
  reviews: Array<{
    id: number
    name: string
    rating: number
    date: string
    comment: string
    avatar?: string
    eventType?: string
  }>
}

export default function VenueDetailsPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced mock venue data with more images and information
  const venue: Venue = {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Downtown District",
    address: "123 Elegant Avenue, Downtown District, City 12345",
    capacity: 500,
    rating: 4.9,
    reviewCount: 127,
    price: 2500,
    images: [
      "/luxury-event-hall.png",
      "/elegant-ballroom.png",
      "/minimalist-event-space.png",
      "/garden-pavilion-lights.png",
      "/rooftop-terrace-city-view.png",
      "/industrial-loft-exposed-brick.png",
      "/elegant-dining-setup.png",
      "/white-chairs-flowers-wedding.png",
      "/modern-cocktail-reception.png",
      "/placeholder-4elti.png",
      "/bridal-suite-prep.png",
      "/outdoor-terrace-city-view.png",
    ],
    videos: ["/venue-walkthrough-thumbnail.png"],
    description: "Elegant ballroom with crystal chandeliers and marble floors",
    longDescription:
      "The Grand Ballroom Elite stands as the pinnacle of luxury event venues in the downtown district. With soaring 20-foot ceilings adorned with magnificent crystal chandeliers, Italian marble floors, and floor-to-ceiling windows offering breathtaking city views, this venue creates an atmosphere of unparalleled elegance. The space seamlessly blends classic architectural elements with modern amenities, making it perfect for weddings, corporate galas, and exclusive celebrations. Our dedicated event team ensures every detail is perfectly executed, from the initial consultation to the final farewell.",
    amenities: [
      { name: "High-Speed WiFi", icon: Wifi, description: "Complimentary high-speed internet throughout the venue" },
      { name: "Valet Parking", icon: Car, description: "Professional valet service for up to 200 vehicles" },
      {
        name: "Full Catering Kitchen",
        icon: Utensils,
        description: "State-of-the-art kitchen with professional chef services",
      },
      {
        name: "Professional Sound System",
        icon: Music,
        description: "Premium audio equipment with wireless microphones",
      },
      { name: "Photography Lighting", icon: Camera, description: "Professional lighting setup for perfect photos" },
      { name: "24/7 Security", icon: Shield, description: "Round-the-clock security and surveillance" },
    ],
    eventTypes: ["Wedding", "Corporate Gala", "Anniversary", "Product Launch", "Charity Event", "Award Ceremony"],
    policies: [
      "No smoking inside the venue",
      "Music must end by 11:00 PM on weekdays, 12:00 AM on weekends",
      "Decorations must be approved in advance",
      "Professional cleanup service included",
      "Cancellation policy: 30 days notice required",
      "Outside catering allowed with prior approval",
      "Alcohol service requires licensed bartender",
    ],
    contact: {
      phone: "+1 (555) 123-4567",
      email: "events@grandballroomelite.com",
      manager: "Sarah Johnson",
      responseTime: "Usually responds within 2 hours",
    },
    availability: ["Available most weekends", "Weekday events welcome", "Holiday bookings available"],
    features: [
      "Crystal chandeliers throughout",
      "Italian marble flooring",
      "Floor-to-ceiling windows",
      "Private bridal suite",
      "Outdoor terrace access",
      "Climate controlled environment",
      "Wheelchair accessible",
      "Professional event coordination",
    ],
    awards: ["Best Wedding Venue 2023", "Excellence in Service Award", "Top Rated Venue - WeddingWire"],
    reviews: [
      {
        id: 1,
        name: "Emily Chen",
        rating: 5,
        date: "2024-01-15",
        comment:
          "Absolutely stunning venue! The crystal chandeliers and marble floors created the perfect ambiance for our wedding. The staff was incredibly professional and attentive to every detail. Sarah, our event coordinator, went above and beyond to make our day perfect.",
        avatar: "/placeholder.svg?height=40&width=40",
        eventType: "Wedding",
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        rating: 5,
        date: "2024-01-08",
        comment:
          "Hosted our company's annual gala here and it exceeded all expectations. The acoustics are perfect, the lighting is beautiful, and the location is convenient for all our guests. The catering was exceptional and the service was flawless.",
        eventType: "Corporate Event",
      },
      {
        id: 3,
        name: "Jessica Thompson",
        rating: 4,
        date: "2023-12-22",
        comment:
          "Beautiful venue with excellent service. The only minor issue was parking during peak hours, but the valet service helped tremendously. The venue itself is breathtaking and our anniversary celebration was memorable.",
        eventType: "Anniversary",
      },
      {
        id: 4,
        name: "David Park",
        rating: 5,
        date: "2023-12-10",
        comment:
          "Perfect venue for our product launch. The modern amenities combined with classic elegance created exactly the atmosphere we wanted. The technical support for our presentation was outstanding.",
        eventType: "Corporate Event",
      },
    ],
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length)
  }

  const similarVenues = [
    {
      id: 2,
      name: "Modern Event Space",
      location: "Tech Quarter",
      rating: 4.8,
      price: 1200,
      image: "/minimalist-event-space.png",
    },
    {
      id: 3,
      name: "Garden Pavilion",
      location: "Botanical Gardens",
      rating: 4.7,
      price: 800,
      image: "/garden-pavilion-lights.png",
    },
    {
      id: 4,
      name: "Rooftop Terrace",
      location: "City Center",
      rating: 4.6,
      price: 1800,
      image: "/rooftop-terrace-city-view.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/explore"
              className="flex items-center text-gray-900 hover:text-amber-600 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Explore
            </Link>
            <div className="text-2xl font-bold text-amber-600">EventHalls</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-all duration-300 hover:scale-105 ${isLiked ? "text-red-500 border-red-200 bg-red-50" : ""}`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 transition-all duration-300 ${isLiked ? "fill-current scale-110" : ""}`}
                />
                {isLiked ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Image Gallery */}
        <div className="relative mb-8">
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden group">
            <img
              src={venue.images[currentImageIndex] || "/placeholder.svg"}
              alt={venue.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Image Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {venue.images.length}
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {venue.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Thumbnail Gallery */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
            {venue.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${
                  index === currentImageIndex
                    ? "border-amber-400 shadow-lg"
                    : "border-transparent hover:border-amber-200"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${venue.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {venue.videos &&
              venue.videos.map((video, index) => (
                <button
                  key={`video-${index}`}
                  className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 border-transparent hover:border-amber-200 transition-all duration-300 hover:scale-105 relative"
                >
                  <img
                    src={video || "/placeholder.svg"}
                    alt={`${venue.name} video ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Venue Header */}
            <div className="animate-fade-in-up">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{venue.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{venue.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="text-lg">Up to {venue.capacity} guests</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
                      <span className="font-semibold text-lg">{venue.rating}</span>
                    </div>
                    <span className="text-gray-600">({venue.reviewCount} reviews)</span>
                    <div className="flex gap-2">
                      {venue.awards.slice(0, 2).map((award, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                          <Award className="w-3 h-3 mr-1" />
                          {award}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-emerald-600">${venue.price}</div>
                  <div className="text-sm text-gray-600">per event</div>
                </div>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">{venue.description}</p>
            </div>

            {/* Enhanced Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview" className="transition-all duration-300">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="amenities" className="transition-all duration-300">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="features" className="transition-all duration-300">
                  Features
                </TabsTrigger>
                <TabsTrigger value="policies" className="transition-all duration-300">
                  Policies
                </TabsTrigger>
                <TabsTrigger value="reviews" className="transition-all duration-300">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">About This Venue</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{venue.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Perfect For</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {venue.eventTypes.map((type, index) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="px-4 py-2 text-center justify-center transition-all duration-300 hover:scale-105 hover:bg-amber-100"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Location & Access</h3>
                  <p className="text-gray-700 mb-6 text-lg">{venue.address}</p>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-80 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Interactive map would be displayed here</p>
                      <p className="text-sm">Showing exact location and nearby amenities</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Venue Amenities</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {venue.amenities.map((amenity, index) => (
                      <div
                        key={amenity.name}
                        className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="bg-amber-100 p-3 rounded-lg">
                          <amenity.icon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{amenity.name}</h4>
                          <p className="text-gray-600">{amenity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Venue Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {venue.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Awards & Recognition</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {venue.awards.map((award, index) => (
                      <div
                        key={index}
                        className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Award className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                        <p className="font-semibold text-amber-800">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="policies" className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Venue Policies</h3>
                  <div className="space-y-4">
                    {venue.policies.map((policy, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 hover:border-gray-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-3 h-3 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{policy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Guest Reviews</h3>
                  <div className="space-y-6">
                    {venue.reviews.map((review, index) => (
                      <Card
                        key={review.id}
                        className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                                {review.eventType && (
                                  <Badge variant="outline" className="mt-1">
                                    {review.eventType}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${
                                        i < review.rating ? "text-amber-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Booking Card */}
            <Card className="p-6 sticky top-24 transition-all duration-300 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-emerald-600 mb-2">${venue.price}</div>
                <div className="text-sm text-gray-600">per event</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>{venue.contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Verified venue</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>Instant booking available</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Event
                </Button>

                <Link href="/booking" className="block">
                  <Button
                    variant="outline"
                    className="w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-emerald-200 hover:border-emerald-400 bg-transparent"
                  >
                    Check Availability
                  </Button>
                </Link>
              </div>

              {/* Quick Booking Form */}
              {showBookingForm && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl animate-fade-in-up">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Inquiry</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input id="event-date" type="date" className="transition-all duration-300 focus:scale-105" />
                    </div>
                    <div>
                      <Label htmlFor="guest-count">Guest Count</Label>
                      <Input
                        id="guest-count"
                        type="number"
                        placeholder="Number of guests"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-type">Event Type</Label>
                      <Input
                        id="event-type"
                        placeholder="Wedding, Corporate, etc."
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your event..."
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:scale-105">
                      Send Inquiry
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-t pt-6 mt-6 space-y-4">
                <h4 className="font-semibold text-gray-900">Contact Venue</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-lg">{venue.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="break-all">{venue.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <span>Manager: {venue.contact.manager}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Venue
                </Button>
              </div>
            </Card>

            {/* Enhanced Availability */}
            <Card className="p-6 transition-all duration-300 hover:shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Availability</h4>
              <div className="space-y-3">
                {venue.availability.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Enhanced Similar Venues */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Similar Venues You Might Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {similarVenues.map((similar, index) => (
              <Link key={similar.id} href={`/venue/${similar.id}`}>
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={similar.image || "/placeholder.svg"}
                      alt={similar.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {similar.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{similar.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-semibold">{similar.rating}</span>
                      </div>
                      <span className="text-xl font-bold text-emerald-600">${similar.price}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <img
              src={venue.images[currentImageIndex] || "/placeholder.svg"}
              alt={venue.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
