"use client";

import { Card } from "@/components/ui/card";

import {
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

export const Charts = () => {
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
  return (
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
  );
};
