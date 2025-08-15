"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Wifi, Car, Utensils, Music, Camera, Shield } from "lucide-react"
import { VenueNavigation } from "../components/venue-navigation"
import { VenueImageGallery } from "../components/venue-image"
import { VenueHeader } from "../components/venue-header"
import { VenueTabs } from "../components/venue-tabs"
import { BookingSidebar } from "../components/venue-sidebar"
import { SimilarVenues } from "../components/venue-similar"
import { ImageModal } from "../components/venue-image-modal"

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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <VenueNavigation isLiked={isLiked} onToggleLike={() => setIsLiked(!isLiked)} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <VenueImageGallery
          images={venue?.images}
          videos={venue?.videos}
          venueName={venue?.name}
          onOpenModal={() => setIsImageModalOpen(true)}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <VenueHeader
              name={venue?.name}
              location={venue?.location}
              capacity={venue?.capacity}
              rating={venue?.rating}
              reviewCount={venue?.reviewCount}
              price={venue?.price}
              description={venue?.description}
              awards={venue?.awards}
            />

            <VenueTabs venue={venue} />
          </div>

          {/* Sidebar */}
          <BookingSidebar price={venue.price} contact={venue.contact} availability={venue.availability} />
        </div>

        <SimilarVenues venues={similarVenues} />
      </div>

      <ImageModal
        isOpen={isImageModalOpen}
        images={venue.images}
        currentIndex={currentImageIndex}
        venueName={venue.name}
        onClose={() => setIsImageModalOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  )
}
