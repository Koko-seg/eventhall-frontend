"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Settings,
  MapPin,
  Users,
  Star,
  Wifi,
  Car,
  Camera,
  Music,
  Utensils,
  X,
} from "lucide-react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateVenue, setShowCreateVenue] = useState(false);
  const [showEditVenue, setShowEditVenue] = useState(false);
  const [editingVenue, setEditingVenue] = useState<any>(null);
  const [venueForm, setVenueForm] = useState({
    name: "",
    location: "",
    description: "",
    capacity: "",
    price: "",
    amenities: [] as string[],
    images: [] as string[],
    eventTypes: [] as string[],
    availableTimes: [] as string[],
  });

  const { user } = useAuth();

  // Mock data for dashboard
  const stats = {
    totalRevenue: 125000,
    totalBookings: 89,
    activeVenues: 12,
    pendingBookings: 7,
  };

  const revenueData = [
    { month: "Jan", revenue: 8500 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 9800 },
    { month: "Apr", revenue: 15200 },
    { month: "May", revenue: 11500 },
    { month: "Jun", revenue: 18000 },
  ];

  const bookingStatusData = [
    { name: "Confirmed", value: 65, color: "#10B981" },
    { name: "Pending", value: 15, color: "#F59E0B" },
    { name: "Cancelled", value: 9, color: "#EF4444" },
  ];

  const recentBookings = [
    {
      id: "EVH-001234",
      venue: "Grand Ballroom Elite",
      client: "Sarah Johnson",
      date: "2024-02-15",
      status: "confirmed",
      amount: 2500,
    },
    {
      id: "EVH-001235",
      venue: "Modern Event Space",
      client: "Tech Corp Inc.",
      date: "2024-02-18",
      status: "pending",
      amount: 1200,
    },
    {
      id: "EVH-001236",
      venue: "Garden Pavilion",
      client: "Emily Chen",
      date: "2024-02-20",
      status: "confirmed",
      amount: 800,
    },
    {
      id: "EVH-001237",
      venue: "Historic Manor Hall",
      client: "Michael Rodriguez",
      date: "2024-02-22",
      status: "pending",
      amount: 1800,
    },
  ];

  const venues = [
    {
      id: 1,
      name: "Grand Ballroom Elite",
      location: "Downtown District",
      capacity: 500,
      price: 2500,
      status: "active",
      bookings: 23,
      revenue: 57500,
      image: "/luxury-event-hall.png",
    },
    {
      id: 2,
      name: "Modern Event Space",
      location: "Tech Quarter",
      capacity: 200,
      price: 1200,
      status: "active",
      bookings: 18,
      revenue: 21600,
      image: "/minimalist-event-space.png",
    },
    {
      id: 3,
      name: "Garden Pavilion",
      location: "Botanical Gardens",
      capacity: 150,
      price: 800,
      status: "active",
      bookings: 15,
      revenue: 12000,
      image: "/garden-pavilion-lights.png",
    },
  ];

  const availableAmenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "av_equipment", label: "A/V Equipment", icon: Camera },
    { id: "sound_system", label: "Sound System", icon: Music },
    { id: "catering", label: "Catering Kitchen", icon: Utensils },
    { id: "bridal_suite", label: "Bridal Suite", icon: Star },
  ];

  const eventTypeOptions = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Conference",
    "Product Launch",
    "Other",
  ];

  const timeSlotOptions = [
    "9:00 AM - 1:00 PM",
    "2:00 PM - 6:00 PM",
    "7:00 PM - 11:00 PM",
    "All Day (9:00 AM - 11:00 PM)",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAmenityToggle = (amenityId: string) => {
    setVenueForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleEventTypeToggle = (eventType: string) => {
    setVenueForm((prev) => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter((type) => type !== eventType)
        : [...prev.eventTypes, eventType],
    }));
  };

  const handleTimeSlotToggle = (timeSlot: string) => {
    setVenueForm((prev) => ({
      ...prev,
      availableTimes: prev.availableTimes.includes(timeSlot)
        ? prev.availableTimes.filter((time) => time !== timeSlot)
        : [...prev.availableTimes, timeSlot],
    }));
  };

  const handleCreateVenue = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to database
    console.log("Creating venue:", venueForm);

    // Save to localStorage for demo
    const existingVenues = JSON.parse(
      localStorage.getItem("adminVenues") || "[]"
    );
    const newVenue = {
      ...venueForm,
      id: Date.now(),
      ownerId: user?.id,
      status: "pending", // Pending super admin approval
      createdAt: new Date().toISOString(),
    };
    existingVenues.push(newVenue);
    localStorage.setItem("adminVenues", JSON.stringify(existingVenues));

    setShowCreateVenue(false);
    setVenueForm({
      name: "",
      location: "",
      description: "",
      capacity: "",
      price: "",
      amenities: [],
      images: [],
      eventTypes: [],
      availableTimes: [],
    });
  };

  const handleEditVenue = (venue: any) => {
    setEditingVenue(venue);
    setVenueForm({
      name: venue.name,
      location: venue.location,
      description: venue.description || "",
      capacity: venue.capacity.toString(),
      price: venue.price.toString(),
      amenities: venue.amenities || [],
      images: venue.images || [venue.image],
      eventTypes: venue.eventTypes || ["Wedding", "Corporate Event"],
      availableTimes: venue.availableTimes || [
        "9:00 AM - 1:00 PM",
        "7:00 PM - 11:00 PM",
      ],
    });
    setShowEditVenue(true);
  };

  const handleUpdateVenue = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would update the database
    console.log("Updating venue:", editingVenue.id, venueForm);

    // Update localStorage for demo
    const existingVenues = JSON.parse(
      localStorage.getItem("adminVenues") || "[]"
    );
    const updatedVenues = existingVenues.map((venue: any) =>
      venue.id === editingVenue.id
        ? {
            ...venue,
            ...venueForm,
            capacity: Number.parseInt(venueForm.capacity),
            price: Number.parseInt(venueForm.price),
          }
        : venue
    );
    localStorage.setItem("adminVenues", JSON.stringify(updatedVenues));

    setShowEditVenue(false);
    setEditingVenue(null);
    setVenueForm({
      name: "",
      location: "",
      description: "",
      capacity: "",
      price: "",
      amenities: [],
      images: [],
      eventTypes: [],
      availableTimes: [],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload to a file storage service
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder-venue-${Date.now()}-${index}.jpg`
      );
      setVenueForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    setVenueForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <ProtectedRoute requiredRole="admin" requireApproval={true}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        {/* Admin Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-amber-600">
                  Venue Owner Dashboard
                </div>
                <Badge variant="secondary" className="text-xs">
                  {user?.status === "pending"
                    ? "Pending Approval"
                    : "Venue Owner"}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.fullName}
                </span>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Avatar>
                  <AvatarFallback>
                    {user?.fullName?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {user?.status === "pending" && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-yellow-800">
                  Your account is pending approval. You can create venues, but
                  they won't be visible to customers until approved by our
                  administrators.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="venues">My Venues</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Revenue
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        ${stats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+12.5%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </Card>

                <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Bookings
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.totalBookings}
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+8.2%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </Card>

                <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active Venues
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.activeVenues}
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-600">
                      All venues operational
                    </span>
                  </div>
                </Card>

                <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Pending Bookings
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.pendingBookings}
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-yellow-600">Requires attention</span>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Revenue Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Revenue"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#F59E0B"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Booking Status
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bookingStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {bookingStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Bookings
                  </h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Booking ID
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Venue
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Client
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 font-mono text-sm">
                            {booking.id}
                          </td>
                          <td className="py-3 px-4">{booking.venue}</td>
                          <td className="py-3 px-4">{booking.client}</td>
                          <td className="py-3 px-4">{booking.date}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            ${booking.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Venues Tab */}
            <TabsContent value="venues" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Venues</h2>
                <Button
                  onClick={() => setShowCreateVenue(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Venue
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="overflow-hidden transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
                        {venue.status}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {venue.name}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {venue.location}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            Capacity:
                          </span>
                          <span className="font-medium">
                            {venue.capacity} guests
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">${venue.price}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Bookings:</span>
                          <span className="font-medium">{venue.bookings}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Revenue:</span>
                          <span className="font-medium text-green-600">
                            ${venue.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleEditVenue(venue)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ... existing code for other tabs ... */}
            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Booking Management
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Booking ID
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Venue
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Client
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Event Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-3 px-4 font-mono text-sm">
                            {booking.id}
                          </td>
                          <td className="py-3 px-4">{booking.venue}</td>
                          <td className="py-3 px-4">{booking.client}</td>
                          <td className="py-3 px-4">{booking.date}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            ${booking.amount}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {booking.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-200 bg-transparent"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Decline
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Analytics & Reports
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Monthly Revenue
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Revenue"]}
                      />
                      <Bar dataKey="revenue" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Venue Performance
                  </h3>
                  <div className="space-y-4">
                    {venues.map((venue) => (
                      <div
                        key={venue.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {venue.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {venue.bookings} bookings
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            ${venue.revenue.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        defaultValue={user?.fullName || ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessEmail">Contact Email</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        defaultValue={user?.email || ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessPhone">Phone Number</Label>
                      <Input
                        id="businessPhone"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <Button className="w-full">Save Changes</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Booking Alerts</p>
                        <p className="text-sm text-gray-600">
                          Get notified when new bookings are made
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-sm text-gray-600">
                          Receive alerts for payment confirmations
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-gray-600">
                          Get weekly performance summaries
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <Button className="w-full">Update Preferences</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Venue Modal */}
        {showCreateVenue && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create New Venue
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCreateVenue(false)}
                    className="hover:bg-gray-100 rounded-full p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={handleCreateVenue} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="venueName">Venue Name *</Label>
                        <Input
                          id="venueName"
                          value={venueForm.name}
                          onChange={(e) =>
                            setVenueForm({ ...venueForm, name: e.target.value })
                          }
                          placeholder="e.g., Grand Ballroom Elite"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="venueLocation">Location *</Label>
                        <Input
                          id="venueLocation"
                          value={venueForm.location}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g., Downtown District"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="venueDescription">Description</Label>
                      <Textarea
                        id="venueDescription"
                        value={venueForm.description}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe your venue, its features, and what makes it special..."
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="venueCapacity">
                          Capacity (guests) *
                        </Label>
                        <Input
                          id="venueCapacity"
                          type="number"
                          value={venueForm.capacity}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              capacity: e.target.value,
                            })
                          }
                          placeholder="e.g., 200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="venuePrice">
                          Price per Event ($) *
                        </Label>
                        <Input
                          id="venuePrice"
                          type="number"
                          value={venueForm.price}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="e.g., 2500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Images
                    </h3>
                    <div>
                      <Label htmlFor="venueImages">Upload Images</Label>
                      <div className="mt-2">
                        <input
                          id="venueImages"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        />
                      </div>
                    </div>

                    {venueForm.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {venueForm.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Venue ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="absolute top-1 right-1 p-1 h-6 w-6 bg-transparent"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableAmenities.map((amenity) => (
                        <Button
                          key={amenity.id}
                          type="button"
                          variant={
                            venueForm.amenities.includes(amenity.id)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 h-auto flex flex-col items-center space-y-1 ${
                            venueForm.amenities.includes(amenity.id)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleAmenityToggle(amenity.id)}
                        >
                          <amenity.icon className="w-5 h-5" />
                          <span className="text-xs">{amenity.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Event Types */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Suitable Event Types
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {eventTypeOptions.map((eventType) => (
                        <Button
                          key={eventType}
                          type="button"
                          variant={
                            venueForm.eventTypes.includes(eventType)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 ${
                            venueForm.eventTypes.includes(eventType)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleEventTypeToggle(eventType)}
                        >
                          {eventType}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Available Times */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {timeSlotOptions.map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          type="button"
                          variant={
                            venueForm.availableTimes.includes(timeSlot)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 ${
                            venueForm.availableTimes.includes(timeSlot)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleTimeSlotToggle(timeSlot)}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold"
                      disabled={
                        !venueForm.name ||
                        !venueForm.location ||
                        !venueForm.capacity ||
                        !venueForm.price
                      }
                    >
                      Create Venue
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}

        {showEditVenue && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Venue: {editingVenue?.name}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowEditVenue(false);
                      setEditingVenue(null);
                    }}
                    className="hover:bg-gray-100 rounded-full p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={handleUpdateVenue} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="editVenueName">Venue Name *</Label>
                        <Input
                          id="editVenueName"
                          value={venueForm.name}
                          onChange={(e) =>
                            setVenueForm({ ...venueForm, name: e.target.value })
                          }
                          placeholder="e.g., Grand Ballroom Elite"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="editVenueLocation">Location *</Label>
                        <Input
                          id="editVenueLocation"
                          value={venueForm.location}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g., Downtown District"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="editVenueDescription">Description</Label>
                      <Textarea
                        id="editVenueDescription"
                        value={venueForm.description}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe your venue, its features, and what makes it special..."
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="editVenueCapacity">
                          Capacity (guests) *
                        </Label>
                        <Input
                          id="editVenueCapacity"
                          type="number"
                          value={venueForm.capacity}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              capacity: e.target.value,
                            })
                          }
                          placeholder="e.g., 200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="editVenuePrice">
                          Price per Event ($) *
                        </Label>
                        <Input
                          id="editVenuePrice"
                          type="number"
                          value={venueForm.price}
                          onChange={(e) =>
                            setVenueForm({
                              ...venueForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="e.g., 2500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Images
                    </h3>
                    <div>
                      <Label htmlFor="editVenueImages">Upload New Images</Label>
                      <div className="mt-2">
                        <input
                          id="editVenueImages"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        />
                      </div>
                    </div>

                    {venueForm.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {venueForm.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Venue ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="absolute top-1 right-1 p-1 h-6 w-6 bg-white"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableAmenities.map((amenity) => (
                        <Button
                          key={amenity.id}
                          type="button"
                          variant={
                            venueForm.amenities.includes(amenity.id)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 h-auto flex flex-col items-center space-y-1 ${
                            venueForm.amenities.includes(amenity.id)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleAmenityToggle(amenity.id)}
                        >
                          <amenity.icon className="w-5 h-5" />
                          <span className="text-xs">{amenity.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Event Types */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Suitable Event Types
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {eventTypeOptions.map((eventType) => (
                        <Button
                          key={eventType}
                          type="button"
                          variant={
                            venueForm.eventTypes.includes(eventType)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 ${
                            venueForm.eventTypes.includes(eventType)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleEventTypeToggle(eventType)}
                        >
                          {eventType}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Available Times */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {timeSlotOptions.map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          type="button"
                          variant={
                            venueForm.availableTimes.includes(timeSlot)
                              ? "default"
                              : "outline"
                          }
                          className={`p-3 ${
                            venueForm.availableTimes.includes(timeSlot)
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : ""
                          }`}
                          onClick={() => handleTimeSlotToggle(timeSlot)}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          setShowEditVenue(false);
                          setEditingVenue(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold"
                        disabled={
                          !venueForm.name ||
                          !venueForm.location ||
                          !venueForm.capacity ||
                          !venueForm.price
                        }
                      >
                        Update Venue
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
