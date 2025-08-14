"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Admin, EmailNotification, Venue } from "@/types/types";

export const SuperAdminSecondHeader = () => {
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [emailNotifications, setEmailNotifications] = useState<
    EmailNotification[]
  >([]);
  const [pendingVenues, setPendingVenues] = useState<Venue[]>([]);

  const platformStats = {
    totalUsers: 1247,
    totalVenues: 89,
    totalBookings: 456,
    totalRevenue: 892000,
    pendingApprovals: pendingAdmins.length + pendingVenues.length,
    unreadEmails: emailNotifications.filter((email) => email.status === "sent")
      .length,
  };
  return (
    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
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
  );
};
