"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BookingCalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
}

export default function BookingCalendar({ selectedDate, onDateSelect }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Mock unavailable dates (in real app, this would come from API)
  const unavailableDates = [
    new Date(2024, 11, 15),
    new Date(2024, 11, 22),
    new Date(2024, 11, 25),
    new Date(2025, 0, 1),
    new Date(2025, 0, 14),
  ]

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some((unavailableDate) => unavailableDate.toDateString() === date.toDateString())
  }

  const isDatePast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (!isDatePast(clickedDate) && !isDateUnavailable(clickedDate)) {
      onDateSelect(clickedDate)
    }
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isPast = isDatePast(date)
      const isUnavailable = isDateUnavailable(date)
      const isSelected = selectedDate?.toDateString() === date.toDateString()
      const isToday = today.toDateString() === date.toDateString()

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isPast || isUnavailable}
          className={`
            p-2 w-full h-10 text-sm rounded-lg transition-all duration-200
            ${
              isSelected
                ? "bg-amber-400 text-black font-semibold"
                : isPast || isUnavailable
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-amber-100 text-gray-700"
            }
            ${isToday && !isSelected ? "ring-2 ring-amber-400" : ""}
          `}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="p-2">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="p-2">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-400 rounded"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span className="text-gray-600">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-amber-400 rounded"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>
    </div>
  )
}
