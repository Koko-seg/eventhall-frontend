// /types/dashboard-types.ts

export interface Admin {
  id: string;
  email: string;
  fullName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: string;
  pricePerEvent: number;
  images: string[];
  status: "pending_review" | "approved" | "rejected";
  createdAt: string;
}

export interface PlatformStats {
  totalUsers: number;
  totalVenues: number;
  totalBookings: number;
  totalRevenue: number;
  pendingApprovals: number;
  unreadEmails: number;
}

export interface MonthlyData {
  month: string;
  users: number;
  venues: number;
  bookings: number;
  revenue: number;
}

export interface UserTypeData {
  name: string;
  value: number;
  color: string;
}

export interface EmailNotification {
  id: number;
  recipient: string;
  subject: string;
  body: string;
  status: "sent" | "draft";
}
