"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react"
import { VenueImageGalleryProps } from "@/types/venue-types"

type ImageGalleryProps ={
imageGallery:VenueImageGalleryProps
}

export function VenueImageGallery({ imageGallery }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.images.length) % imageGallery.images.length)
  }


  return (
    <div className="relative mb-8">
      <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden group">
        <img
          src={imageGallery?.images[currentImageIndex] || "/placeholder.svg"}
          alt={imageGallery?.venueName}
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
          onClick={imageGallery.onOpenModal}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {imageGallery.images.length}
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {imageGallery.images.map((_, index) => (
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

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
        {imageGallery.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${
              index === currentImageIndex ? "border-amber-400 shadow-lg" : "border-transparent hover:border-amber-200"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${imageGallery.venueName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {imageGallery.videos &&
          imageGallery.videos.map((video, index) => (
            <button
              key={`video-${index}`}
              className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 border-transparent hover:border-amber-200 transition-all duration-300 hover:scale-105 relative"
            >
              <img
                src={video || "/placeholder.svg"}
                alt={`${imageGallery.venueName} video ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </button>
          ))}
      </div>
    </div>
  )
}