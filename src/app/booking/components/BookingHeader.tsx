import type React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BookingHeader = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-gray-900 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-2xl font-bold text-amber-600">EventHalls</div>
        </div>
      </div>
    </nav>
  );
};
