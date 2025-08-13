import { EventHallCart } from "./EventHallCart";

export const EventHallCardSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-text-shimmer">
          Featured Venues
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 animate-fade-in-up-delay">
          Handpicked spaces for extraordinary events
        </p>
      </div>

      <EventHallCart />
    </div>
  );
};
