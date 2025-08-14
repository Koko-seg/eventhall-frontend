"use client";

import { Card } from "@/components/ui/card";
import { Admin, EmailNotification, Venue } from "@/types/types";

import {
  Users,
  Building,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";

export const StatisticCardSection = () => {
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [pendingVenues, setPendingVenues] = useState<Venue[]>([]);
  const [emailNotifications, setEmailNotifications] = useState<
    EmailNotification[]
  >([]);

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
    <div className="grid md:grid-cols-5 gap-6">
      <Card className="p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
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
            <p className="text-sm font-medium text-gray-600">Active Venues</p>
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
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
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
  );
};
