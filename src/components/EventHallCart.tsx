"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import Link from "next/link";
import { allVenues } from "@/components/../data/mockData";

export const EventHallCart = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragVelocity, setDragVelocity] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setDragOffset(startPos);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      const velocity = {
        x: e.clientX - lastMousePos.x,
        y: e.clientY - lastMousePos.y,
      };
      setDragVelocity(velocity);
      setLastMousePos({ x: e.clientX, y: e.clientY });

      containerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      containerRef.current.style.transition = "none";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.transition =
        "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
      containerRef.current.style.transform = "translate(0px, 0px) scale(1)";

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "transform 0.3s ease-out";
        }
      }, 800);
    }
  };

  const featuredHalls = allVenues.slice(0, 3);
  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 cursor-grab active:cursor-grabbing transition-all duration-300"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {featuredHalls.map((hall, index) => (
        <Link key={hall.id} href={`/venue/${hall.id}`} className="block">
          <Card
            className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 animate-card-entrance cursor-pointer"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src={hall.image || "/placeholder.svg"}
                alt={hall.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                <Badge className="bg-amber-400 text-black font-semibold animate-bounce-in text-xs sm:text-sm">
                  <Star className="w-3 h-3 mr-1 fill-current animate-spin-slow" />
                  {hall.rating}
                </Badge>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-black text-base sm:text-lg font-semibold animate-float shadow-lg">
                  View Details
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                {hall.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-3 transform group-hover:translate-x-2 transition-transform duration-300">
                <MapPin className="w-4 h-4 mr-2 animate-pulse" />
                <span className="text-sm sm:text-base">{hall.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">
                  Up to {hall.capacity} guests
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hall.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs transform hover:scale-110 transition-all duration-300 animate-tag-entrance"
                    style={{
                      animationDelay: `${index * 0.2 + tagIndex * 0.1}s`,
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 animate-price-pulse">
                  {hall.price}
                </span>
                <Button
                  className="bg-black text-white hover:bg-gray-800 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 group-hover:animate-bounce active:scale-95 text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/venue/${hall.id}`;
                  }}
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin-slow" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
