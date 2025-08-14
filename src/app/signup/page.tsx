"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleAdminPath = () => {
    router.push("/admin-signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-amber-500">EventSpace</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Choose your path to get started with the perfect event experience
          </p>
        </div>

        {/* The single card will be centered */}
        <div className="max-w-md mx-auto">
          {/* Admin Path Card */}
          <Card
            className={`p-8 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border-2 ${
              hoveredCard === "admin"
                ? "border-amber-400 shadow-xl"
                : "border-gray-200"
            }`}
            onMouseEnter={() => setHoveredCard("admin")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleAdminPath}
          >
            <div className="text-center space-y-6">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === "admin"
                    ? "bg-amber-400 text-white"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                <Building2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Register Your Event Hall
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Are you an event hall owner? Join our platform to showcase your
                venue, manage bookings, and grow your business.
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Upload photos and venue details</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Set pricing and availability</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Manage bookings and payments</span>
                </div>
              </div>

              <Button
                className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                  hoveredCard === "admin"
                    ? "bg-amber-500 text-white transform scale-105"
                    : "bg-amber-400 text-black hover:bg-amber-500"
                }`}
              >
                Get Started as Venue Owner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
