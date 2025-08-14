"use client";

import { useState, useEffect } from "react";
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
  Shield,
  Users,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Settings,
  UserCheck,
  UserX,
  BuildingCheck,
  BuildingX,
  Mail,
} from "lucide-react";
import EmailNotificationsPanel from "@/components/email-notifications-panel";
import { emailService } from "@/lib/email-service";
import { Admin, Venue } from "@/data/mockData";

const SUPER_ADMINS = [
  { email: "tseko0301@gmail.com", name: "Koko", password: "koko0301" },
  { email: "superadmin2@eventspace.com", name: "Sarah Johnson" },
];

export default function SuperAdminDashboard() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState<Admin | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [pendingVenues, setPendingVenues] = useState<Venue | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [emailNotifications, setEmailNotifications] = useState<any[]>([]);

  useEffect(() => {
    const savedSuperAdmin = localStorage.getItem("currentSuperAdmin");
    if (savedSuperAdmin) {
      const admin = JSON.parse(savedSuperAdmin);
      setCurrentSuperAdmin(admin);
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    if (isVerified) {
      // Load pending admins and venues from localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const adminVenues = JSON.parse(
        localStorage.getItem("adminVenues") || "[]"
      );
      const venueRegistrations = JSON.parse(
        localStorage.getItem("venueRegistrations") || "[]"
      );

      setPendingAdmins(
        registeredUsers.filter(
          (u: any) => u.role === "admin" && u.status === "pending"
        )
      );
      setPendingVenues([
        ...adminVenues.filter((v: any) => v.status === "pending"),
        ...venueRegistrations.filter((v: any) => v.status === "pending_review"),
      ]);

      const notifications = emailService.getVenueRegistrationEmails();
      setEmailNotifications(notifications);
    }
  }, [isVerified]);

  const handleVerification = () => {
    const admin = SUPER_ADMINS.find(
      (admin) => admin.email.toLowerCase() === verificationEmail.toLowerCase()
    );
    if (admin) {
      setCurrentSuperAdmin(admin);
      setIsVerified(true);
      localStorage.setItem("currentSuperAdmin", JSON.stringify(admin));
      setActiveTab("pending-admins");
    } else {
      alert(
        "Access denied. Only authorized super administrators can access this page."
      );
    }
  };

  const handleLogout = () => {
    setIsVerified(false);
    setCurrentSuperAdmin(null);
    setVerificationEmail("");
    localStorage.removeItem("currentSuperAdmin");
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Super Admin Access
            </h1>
            <p className="text-gray-600">
              Enter your authorized email address to access the super admin
              dashboard
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Super Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={verificationEmail}
                onChange={(e) => setVerificationEmail(e.target.value)}
                placeholder="Enter your super admin email"
                className="mt-1"
              />
            </div>
            <Button
              onClick={handleVerification}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!verificationEmail.trim()}
            >
              <Shield className="w-4 h-4 mr-2" />
              Access Dashboard
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Only authorized super administrators can access this dashboard.
              Contact system administrator if you need access.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // ... existing code for platform stats and handlers ...
  const platformStats = {
    totalUsers: 1247,
    totalVenues: 89,
    totalBookings: 456,
    totalRevenue: 892000,
    pendingApprovals: pendingAdmins.length + pendingVenues.length,
    unreadEmails: emailNotifications.filter((email) => email.status === "sent")
      .length,
  };

  const monthlyData = [
    { month: "Jan", users: 45, venues: 8, bookings: 23, revenue: 45000 },
    { month: "Feb", users: 67, venues: 12, bookings: 34, revenue: 67000 },
    { month: "Mar", users: 89, venues: 15, bookings: 45, revenue: 89000 },
    { month: "Apr", users: 123, venues: 18, bookings: 67, revenue: 123000 },
    { month: "May", users: 156, venues: 22, bookings: 89, revenue: 156000 },
    { month: "Jun", users: 189, venues: 25, bookings: 112, revenue: 189000 },
  ];

  const userTypeData = [
    { name: "Event Organizers", value: 1089, color: "#10B981" },
    { name: "Venue Owners", value: 134, color: "#F59E0B" },
    { name: "Super Admins", value: 24, color: "#8B5CF6" },
  ];

  const handleApproveAdmin = (adminId: number) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const updatedUsers = registeredUsers.map((u: any) =>
      u.id === adminId
        ? { ...u, status: "approved", approvedAt: new Date().toISOString() }
        : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    setPendingAdmins(pendingAdmins.filter((admin) => admin.id !== adminId));
    setSelectedAdmin(null);
  };

  const handleRejectAdmin = (adminId: number) => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const updatedUsers = registeredUsers.map((u: any) =>
      u.id === adminId
        ? {
            ...u,
            status: "rejected",
            rejectedAt: new Date().toISOString(),
            rejectionReason,
          }
        : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    setPendingAdmins(pendingAdmins.filter((admin) => admin.id !== adminId));
    setSelectedAdmin(null);
    setRejectionReason("");
  };

  const handleApproveVenue = (venueId: number) => {
    const adminVenues = JSON.parse(localStorage.getItem("adminVenues") || "[]");
    const venueRegistrations = JSON.parse(
      localStorage.getItem("venueRegistrations") || "[]"
    );

    const updatedAdminVenues = adminVenues.map((v: any) =>
      v.id === venueId
        ? { ...v, status: "approved", approvedAt: new Date().toISOString() }
        : v
    );
    const updatedVenueRegistrations = venueRegistrations.map((v: any) =>
      v.id === venueId
        ? { ...v, status: "approved", approvedAt: new Date().toISOString() }
        : v
    );

    localStorage.setItem("adminVenues", JSON.stringify(updatedAdminVenues));
    localStorage.setItem(
      "venueRegistrations",
      JSON.stringify(updatedVenueRegistrations)
    );
    setPendingVenues(pendingVenues.filter((venue) => venue.id !== venueId));
    setSelectedVenue(null);
  };

  const handleRejectVenue = (venueId: number) => {
    const adminVenues = JSON.parse(localStorage.getItem("adminVenues") || "[]");
    const venueRegistrations = JSON.parse(
      localStorage.getItem("venueRegistrations") || "[]"
    );

    const updatedAdminVenues = adminVenues.map((v: any) =>
      v.id === venueId
        ? {
            ...v,
            status: "rejected",
            rejectedAt: new Date().toISOString(),
            rejectionReason,
          }
        : v
    );
    const updatedVenueRegistrations = venueRegistrations.map((v: any) =>
      v.id === venueId
        ? {
            ...v,
            status: "rejected",
            rejectedAt: new Date().toISOString(),
            rejectionReason,
          }
        : v
    );

    localStorage.setItem("adminVenues", JSON.stringify(updatedAdminVenues));
    localStorage.setItem(
      "venueRegistrations",
      JSON.stringify(updatedVenueRegistrations)
    );
    setPendingVenues(pendingVenues.filter((venue) => venue.id !== venueId));
    setSelectedVenue(null);
    setRejectionReason("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Super Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-purple-600">
                Super Admin Dashboard
              </div>
              <Badge
                variant="secondary"
                className="text-xs bg-purple-100 text-purple-800"
              >
                <Shield className="w-3 h-3 mr-1" />
                Super Administrator
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentSuperAdmin?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Settings className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Avatar>
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {currentSuperAdmin?.name?.charAt(0) || "SA"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
            <TabsTrigger value="email-notifications" className="relative">
              Email Notifications
              {platformStats.unreadEmails > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[1.25rem] h-5">
                  {platformStats.unreadEmails}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending-admins" className="relative">
              Admin Requests
              {pendingAdmins.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[1.25rem] h-5">
                  {pendingAdmins.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending-venues" className="relative">
              Venue Requests
              {pendingVenues.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[1.25rem] h-5">
                  {pendingVenues.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          {/* ... existing code for all tabs content ... */}
          {/* Platform Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-5 gap-6">
              <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {platformStats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+15.2%</span>
                  <span className="text-gray-600 ml-1">this month</span>
                </div>
              </Card>

              <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Venues
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {platformStats.totalVenues}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+8.7%</span>
                  <span className="text-gray-600 ml-1">this month</span>
                </div>
              </Card>

              <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {platformStats.totalBookings}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+22.1%</span>
                  <span className="text-gray-600 ml-1">this month</span>
                </div>
              </Card>

              <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Platform Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${platformStats.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+18.5%</span>
                  <span className="text-gray-600 ml-1">this month</span>
                </div>
              </Card>

              <Card className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Approvals
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {platformStats.pendingApprovals}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <Clock className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-600">Requires attention</span>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      name="Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="venues"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      name="Venues"
                    />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#10B981"
                      strokeWidth={3}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  User Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-5 gap-4">
                <Button
                  onClick={() => setActiveTab("email-notifications")}
                  className="p-4 h-auto flex flex-col items-center space-y-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Mail className="w-6 h-6" />
                  <span>Email Notifications</span>
                  {platformStats.unreadEmails > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {platformStats.unreadEmails} unread
                    </Badge>
                  )}
                </Button>

                <Button
                  onClick={() => setActiveTab("pending-admins")}
                  className="p-4 h-auto flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700"
                >
                  <UserCheck className="w-6 h-6" />
                  <span>Review Admins</span>
                  {pendingAdmins.length > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {pendingAdmins.length} pending
                    </Badge>
                  )}
                </Button>

                <Button
                  onClick={() => setActiveTab("pending-venues")}
                  className="p-4 h-auto flex flex-col items-center space-y-2 bg-purple-600 hover:bg-purple-700"
                >
                  <BuildingCheck className="w-6 h-6" />
                  <span>Review Venues</span>
                  {pendingVenues.length > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {pendingVenues.length} pending
                    </Badge>
                  )}
                </Button>

                <Button
                  onClick={() => setActiveTab("analytics")}
                  className="p-4 h-auto flex flex-col items-center space-y-2 bg-green-600 hover:bg-green-700"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span>View Analytics</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("settings")}
                  className="p-4 h-auto flex flex-col items-center space-y-2 bg-gray-600 hover:bg-gray-700"
                >
                  <Settings className="w-6 h-6" />
                  <span>System Settings</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="email-notifications" className="space-y-6">
            <EmailNotificationsPanel />
          </TabsContent>

          {/* ... existing code for all other tabs ... */}
          {/* Pending Admins Tab */}
          <TabsContent value="pending-admins" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Pending Admin Approvals
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search admins..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {pendingAdmins.length === 0 ? (
              <Card className="p-12 text-center">
                <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Pending Admin Approvals
                </h3>
                <p className="text-gray-600">
                  All venue owner applications have been reviewed.
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingAdmins.map((admin) => (
                  <Card
                    key={admin.id}
                    className="p-6 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {admin.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {admin.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">{admin.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Role:</span>
                        <Badge className="bg-purple-100 text-purple-800">
                          Venue Owner
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Applied:</span>
                        <span className="font-medium">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Pending Review
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedAdmin(admin)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproveAdmin(admin.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedAdmin(admin)}
                        variant="outline"
                        className="text-red-600 border-red-200"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pending Venues Tab */}
          <TabsContent value="pending-venues" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Pending Venue Approvals
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search venues..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {pendingVenues.length === 0 ? (
              <Card className="p-12 text-center">
                <BuildingCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Pending Venue Approvals
                </h3>
                <p className="text-gray-600">
                  All venue submissions have been reviewed.
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingVenues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="overflow-hidden transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={venue.images?.[0] || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-yellow-100 text-yellow-800">
                        Pending Review
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {venue.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mb-4">
                        <MapPin className="w-3 h-3 mr-1" />
                        {venue.location}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">
                            {venue.capacity} guests
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">
                            ${venue.pricePerEvent || venue.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Submitted:</span>
                          <span className="font-medium">
                            {new Date(
                              venue.createdAt || venue.submittedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedVenue(venue)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveVenue(venue.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setSelectedVenue(venue)}
                          variant="outline"
                          className="text-red-600 border-red-200"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Platform Analytics
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Monthly Revenue
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  User Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#10B981"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              System Settings
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" defaultValue="EventSpace" />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      defaultValue="support@eventspace.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      defaultValue="10"
                    />
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Approval Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-approve venues</p>
                      <p className="text-sm text-gray-600">
                        Automatically approve venues from verified owners
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-gray-600">
                        Send email alerts for new submissions
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require venue verification</p>
                      <p className="text-sm text-gray-600">
                        Require additional verification for new venues
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ... existing code for modals ... */}
      {/* Admin Review Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Review Admin Application
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAdmin(null)}
                  className="hover:bg-gray-100 rounded-full p-2"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                      {selectedAdmin.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedAdmin.fullName}
                    </h3>
                    <p className="text-gray-600">{selectedAdmin.email}</p>
                    <Badge className="bg-purple-100 text-purple-800 mt-1">
                      Venue Owner Application
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">
                      Application Date
                    </Label>
                    <p className="text-lg">
                      {new Date(selectedAdmin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">
                      Account Type
                    </Label>
                    <p className="text-lg">Venue Owner</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="rejectionReason">
                    Rejection Reason (if rejecting)
                  </Label>
                  <Textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a reason for rejection..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-4 pt-6 border-t">
                  <Button
                    onClick={() => handleApproveAdmin(selectedAdmin.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Admin
                  </Button>
                  <Button
                    onClick={() => handleRejectAdmin(selectedAdmin.id)}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200"
                    disabled={!rejectionReason.trim()}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Venue Review Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Review Venue Submission
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVenue(null)}
                  className="hover:bg-gray-100 rounded-full p-2"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Venue Images */}
                {selectedVenue.images && selectedVenue.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Venue Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedVenue.images.map(
                        (image: string, index: number) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`${selectedVenue.name} ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Venue Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">
                          Venue Name
                        </Label>
                        <p className="text-lg">{selectedVenue.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">
                          Location
                        </Label>
                        <p className="text-lg flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedVenue.location}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">
                          Capacity
                        </Label>
                        <p className="text-lg">
                          {selectedVenue.capacity} guests
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">
                          Price
                        </Label>
                        <p className="text-lg font-semibold text-green-600">
                          ${selectedVenue.pricePerEvent || selectedVenue.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Additional Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">
                          Submitted
                        </Label>
                        <p className="text-lg">
                          {new Date(
                            selectedVenue.createdAt || selectedVenue.submittedAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedVenue.amenities &&
                        selectedVenue.amenities.length > 0 && (
                          <div>
                            <Label className="text-sm font-semibold text-gray-600">
                              Amenities
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedVenue.amenities.map(
                                (amenity: string) => (
                                  <Badge
                                    key={amenity}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {amenity}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {selectedVenue.eventTypes &&
                        selectedVenue.eventTypes.length > 0 && (
                          <div>
                            <Label className="text-sm font-semibold text-gray-600">
                              Event Types
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedVenue.eventTypes.map((type: string) => (
                                <Badge
                                  key={type}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {selectedVenue.description && (
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">
                      Description
                    </Label>
                    <p className="text-gray-900 mt-1">
                      {selectedVenue.description}
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="venueRejectionReason">
                    Rejection Reason (if rejecting)
                  </Label>
                  <Textarea
                    id="venueRejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a reason for rejection..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-4 pt-6 border-t">
                  <Button
                    onClick={() => handleApproveVenue(selectedVenue.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <BuildingCheck className="w-4 h-4 mr-2" />
                    Approve Venue
                  </Button>
                  <Button
                    onClick={() => handleRejectVenue(selectedVenue.id)}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200"
                    disabled={!rejectionReason.trim()}
                  >
                    <BuildingX className="w-4 h-4 mr-2" />
                    Reject Venue
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
