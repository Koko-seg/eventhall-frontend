// components/BookingDateTimeSection.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import BookingCalendar from "@/components/booking-calendar";

interface BookingDateTimeSectionProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  timeSlots: string[];
}

export const BookingDateTimeSection = ({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  timeSlots,
}: BookingDateTimeSectionProps) => {
  return (
    <>
      {/* Date Selection */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Select Date
        </h3>
        <BookingCalendar
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Select Time
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                type="button"
                variant={selectedTime === slot ? "default" : "outline"}
                className={`p-4 transition-all duration-300 ${
                  selectedTime === slot
                    ? "bg-amber-400 text-black hover:bg-amber-500 transform scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => onTimeSelect(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
