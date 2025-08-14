import { Card } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"

interface SimilarVenue {
  id: number
  name: string
  location: string
  rating: number
  price: number
  image: string
}

interface SimilarVenuesProps {
  venues: SimilarVenue[]
}

export function SimilarVenues({ venues }: SimilarVenuesProps) {
  return (
    <div className="mt-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-10">Similar Venues You Might Like</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {venues.map((venue, index) => (
          <Link key={venue.id} href={`/venue/${venue.id}`}>
            <Card
              className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{venue.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-semibold">{venue.rating}</span>
                  </div>
                  <span className="text-xl font-bold text-emerald-600">${venue.price}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
