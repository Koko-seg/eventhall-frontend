// components/data/venueData.tsx

export type Venue = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  rating: number;
  price: number;
  image: string;
  tags: string[];
  amenities: string[];
  eventTypes: string[];
  description: string;
};

export type Admin = {
  id: number;
  fullName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
};

export const allVenues: Venue[] = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Downtown District",
    capacity: 500,
    rating: 4.9,
    price: 2500,
    image: "/luxury-event-hall.png",
    tags: ["Wedding", "Corporate", "Luxury"],
    amenities: [
      "Full Kitchen",
      "A/V Equipment",
      "Parking",
      "Bridal Suite",
      "Dance Floor",
    ],
    eventTypes: ["Wedding", "Corporate", "Gala"],
    description: "Elegant ballroom with crystal chandeliers and marble floors",
  },
  {
    id: 2,
    name: "Modern Event Space",
    location: "Tech Quarter",
    capacity: 200,
    rating: 4.8,
    price: 1200,
    image: "/minimalist-event-space.png",
    tags: ["Corporate", "Launch", "Modern"],
    amenities: [
      "A/V Equipment",
      "High-Speed WiFi",
      "Catering Kitchen",
      "Parking",
    ],
    eventTypes: ["Corporate", "Product Launch", "Conference"],
    description: "Sleek contemporary space with floor-to-ceiling windows",
  },
  {
    id: 3,
    name: "Garden Pavilion",
    location: "Botanical Gardens",
    capacity: 150,
    rating: 4.7,
    price: 800,
    image: "/garden-pavilion-lights.png",
    tags: ["Wedding", "Outdoor", "Garden"],
    amenities: [
      "Outdoor Setting",
      "Garden Views",
      "Catering Kitchen",
      "Parking",
    ],
    eventTypes: ["Wedding", "Birthday", "Anniversary"],
    description: "Charming outdoor pavilion surrounded by lush gardens",
  },
  {
    id: 4,
    name: "Historic Manor Hall",
    location: "Heritage District",
    capacity: 300,
    rating: 4.6,
    price: 1800,
    image: "/elegant-ballroom.png",
    tags: ["Wedding", "Historic", "Elegant"],
    amenities: [
      "Historic Architecture",
      "Full Kitchen",
      "Bridal Suite",
      "Parking",
      "Piano",
    ],
    eventTypes: ["Wedding", "Anniversary", "Gala"],
    description: "Victorian-era manor with original architectural details",
  },
  {
    id: 5,
    name: "Rooftop Terrace",
    location: "City Center",
    capacity: 120,
    rating: 4.5,
    price: 1500,
    image: "/rooftop-terrace-city-view.png",
    tags: ["Modern", "Outdoor", "City Views"],
    amenities: ["City Views", "Outdoor Setting", "Bar", "A/V Equipment"],
    eventTypes: ["Corporate", "Birthday", "Cocktail Party"],
    description: "Stunning rooftop venue with panoramic city views",
  },
  {
    id: 6,
    name: "Industrial Loft",
    location: "Arts District",
    capacity: 180,
    rating: 4.4,
    price: 900,
    image: "/industrial-loft-exposed-brick.png",
    tags: ["Industrial", "Modern", "Artistic"],
    amenities: ["Exposed Brick", "High Ceilings", "A/V Equipment", "Parking"],
    eventTypes: ["Corporate", "Art Show", "Product Launch"],
    description: "Converted warehouse with exposed brick and industrial charm",
  },
];
