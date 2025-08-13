"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Eye, Clock, CheckCircle, Building2, User } from "lucide-react"
import { emailService, type EmailNotification } from "@/lib/email-service"

export default function EmailNotificationsPanel() {
  const [notifications, setNotifications] = useState<EmailNotification[]>([])
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    const venueEmails = emailService.getVenueRegistrationEmails()
    setNotifications(venueEmails.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()))
  }

  const handleEmailClick = (email: EmailNotification) => {
    setSelectedEmail(email)
    if (email.status !== "read") {
      emailService.markEmailAsRead(email.id)
      loadNotifications()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (selectedEmail) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedEmail(null)}>
            ← Back to Notifications
          </Button>
          <Badge className={getStatusColor(selectedEmail.status)}>{selectedEmail.status}</Badge>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEmail.subject}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(selectedEmail.sentAt).toLocaleString()}
                </span>
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  To: {selectedEmail.to.join(", ")}
                </span>
              </div>
            </div>

            {/* Venue Registration Details */}
            {selectedEmail.type === "venue_registration" && selectedEmail.data && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Venue Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedEmail.data.venueName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedEmail.data.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right">{selectedEmail.data.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{selectedEmail.data.capacity} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">${selectedEmail.data.pricePerEvent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Owner Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedEmail.data.ownerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedEmail.data.ownerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedEmail.data.contactPhone}</span>
                      </div>
                      {selectedEmail.data.businessLicense && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">License:</span>
                          <span className="font-medium">{selectedEmail.data.businessLicense}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedEmail.data.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedEmail.data.description}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmail.data.amenities.map((amenity: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmail.data.eventTypes.map((type: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Time Slots</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmail.data.availableTimes.map((time: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedEmail.data.specialFeatures && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Features</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedEmail.data.specialFeatures}</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-800 mb-4">Action Required</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Venue
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Request More Info
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                      ❌ Reject Application
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Email Notifications</h2>
        <Badge variant="secondary">{notifications.filter((n) => n.status === "sent").length} unread</Badge>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">Venue registration emails will appear here</p>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                notification.status === "sent" ? "border-l-4 border-l-blue-400 bg-blue-50" : ""
              }`}
              onClick={() => handleEmailClick(notification)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${notification.status === "sent" ? "bg-blue-100" : "bg-gray-100"}`}>
                    <Mail className={`w-5 h-5 ${notification.status === "sent" ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{notification.subject}</h3>
                    <p className="text-sm text-gray-600">
                      From: {notification.data?.ownerName} ({notification.data?.ownerEmail})
                    </p>
                    <p className="text-xs text-gray-500">{new Date(notification.sentAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                  {notification.data && (
                    <div className="text-right text-sm text-gray-600">
                      <p className="font-medium">{notification.data.venueName}</p>
                      <p>{notification.data.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
