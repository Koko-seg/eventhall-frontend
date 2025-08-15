import { Badge } from "@/components/ui/badge";
import { VenueAward, VenueHeaderProps } from "@/types/venue-types";
import { MapPin, Users, Star, Award } from "lucide-react";

type VenueHeaderPropss = {
  Header: VenueHeaderProps["venue"];
  awards: VenueAward["award"];
};

export function VenueHeader({ Header,awards }: VenueHeaderPropss) {
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {Header.name}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{Header.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-lg">Up to {Header.capacity} guests</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
              <span className="font-semibold text-lg">{Header.rating}</span>
            </div>
            <div>
              {Header.reviews.map((review) => (
                <div key={review.id}>
                  <p>{review.comment}</p>
                  <p>Rating: {review.rating}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {awards.slice(0, 2).map((award, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {awards.award}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-emerald-600">
            ${Header.price}
          </div>
          <div className="text-sm text-gray-600">per event</div>
        </div>
      </div>
      <p className="text-xl text-gray-700 leading-relaxed">
        {Header.description}
      </p>
    </div>
  );
}
