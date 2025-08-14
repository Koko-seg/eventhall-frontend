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
} from "recharts";
import {
  Building,
  XCircle,
  Eye,
  Search,
  Filter,
  Clock,
  MapPin,
  UserCheck,
  UserX,
  Building2,
  CheckCircle,
} from "lucide-react";

import { emailService } from "@/lib/email-service";

const SUPER_ADMINS = [
  { email: "superadmin1@eventspace.com", name: "Koko Bear" },
  { email: "superadmin2@eventspace.com", name: "Sarah Johnson" },
];

export default function AdminRequest() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingAdmins, setPendingAdmins] = useState<any[]>([]);
  const [pendingVenues, setPendingVenues] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
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
    <TabsContent value="pending-admins" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Pending Admin Approvals
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search admins..." className="pl-10 w-64" />
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
  );
}
