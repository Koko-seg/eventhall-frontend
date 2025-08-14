"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Shield, Zap, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

interface BookingSidebarProps {
  price: number
  contact: {
    phone: string
    email: string
    manager: string
    responseTime: string
  }
  availability: string[]
}

export function BookingSidebar({ price, contact, availability }: BookingSidebarProps) {
  const [showBookingForm, setShowBookingForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Booking Card */}
      <Card className="p-6 sticky top-24 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-emerald-600 mb-2">${price}</div>
          <div className="text-sm text-gray-600">per event</div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>{contact.responseTime}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>Verified venue</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Zap className="w-5 h-5 text-emerald-600" />
            <span>Instant booking available</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Event
          </Button>

          <Link href="/booking" className="block">
            <Button
              variant="outline"
              className="w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-emerald-200 hover:border-emerald-400 bg-transparent"
            >
              Check Availability
            </Button>
          </Link>
        </div>

        {/* Quick Booking Form */}
        {showBookingForm && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl animate-fade-in-up">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Inquiry</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="event-date">Event Date</Label>
                <Input id="event-date" type="date" className="transition-all duration-300 focus:scale-105" />
              </div>
              <div>
                <Label htmlFor="guest-count">Guest Count</Label>
                <Input
                  id="guest-count"
                  type="number"
                  placeholder="Number of guests"
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <Input
                  id="event-type"
                  placeholder="Wedding, Corporate, etc."
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your event..."
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:scale-105">
                Send Inquiry
              </Button>
            </div>
          </div>
        )}

        <div className="border-t pt-6 mt-6 space-y-4">
          <h4 className="font-semibold text-gray-900">Contact Venue</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-lg">{contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="break-all">{contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span>Manager: {contact.manager}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 bg-transparent">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Venue
          </Button>
        </div>
      </Card>

      {/* Availability */}
      <Card className="p-6 transition-all duration-300 hover:shadow-lg">
        <h4 className="font-semibold text-gray-900 mb-4">Availability</h4>
        <div className="space-y-3">
          {availability.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
