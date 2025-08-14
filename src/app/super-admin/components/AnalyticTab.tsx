import { Card } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";

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

export const AnalyticTab = () => {
  const monthlyData = [
    { month: "Jan", users: 45, venues: 8, bookings: 23, revenue: 45000 },
    { month: "Feb", users: 67, venues: 12, bookings: 34, revenue: 67000 },
    { month: "Mar", users: 89, venues: 15, bookings: 45, revenue: 89000 },
    { month: "Apr", users: 123, venues: 18, bookings: 67, revenue: 123000 },
    { month: "May", users: 156, venues: 22, bookings: 89, revenue: 156000 },
    {
      month: "Jun",
      users: 189,
      venues: 25,
      bookings: 112,
      revenue: 189000,
    },
  ];
  return (
    <TabsContent value="analytics" className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>

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
  );
};
