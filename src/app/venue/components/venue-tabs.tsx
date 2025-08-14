import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, CheckCircle, Award } from "lucide-react"

interface Venue {
  longDescription: string
  eventTypes: string[]
  address: string
  amenities: Array<{ name: string; icon: any; description: string }>
  features: string[]
  awards: string[]
  policies: string[]
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

interface VenueTabsProps {
  venue: Venue
}

export function VenueTabs({ venue }: VenueTabsProps) {
  return (
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
  )
}