"use client"

import { Button } from "@/components/ui/button"
import { VenueNavigationProps } from "@/types/venue-types"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import Link from "next/link"


export function VenueNavigation({ onToggleLike,isLiked }: VenueNavigationProps) {
  return (
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
              onClick={onToggleLike}
              className={`transition-all duration-300 hover:scale-105 ${
                isLiked ? "text-red-500 border-red-200 bg-red-50" : ""
              }`}
            >
              <Heart
                className={`w-4 h-4 mr-2 transition-all duration-300 ${isLiked ? "fill-current scale-110" : ""}`}
              />
              {isLiked ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}