"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

export default function SuperAdminLoginPage() {
  const router = useRouter();

  const SUPER_ADMINS = [
    { email: "superadmin1@eventspace.com", name: "Koko Bear" },
  ];

  const [verificationEmail, setVerificationEmail] = useState("");

  useEffect(() => {
    const savedSuperAdmin = localStorage.getItem("currentSuperAdmin");
    if (savedSuperAdmin) {
      // If already logged in, redirect to the dashboard
      router.push("/super-admin");
    }
  }, [router]);

  const handleVerification = () => {
    const admin = SUPER_ADMINS.find(
      (admin) => admin.email.toLowerCase() === verificationEmail.toLowerCase()
    );
    if (admin) {
      localStorage.setItem("currentSuperAdmin", JSON.stringify(admin));
      // Redirect to the dashboard page after successful login
      router.push("/super-admin/dashboard");
    } else {
      alert(
        "Access denied. Only authorized super administrators can access this page."
      );
    }
  };

  // Example of refactored functions for backend use
  //   const handleVerification = async () => {
  //     try {
  //       // Make an API call to your backend authentication endpoint
  //       const response = await fetch("/api/super-admin/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: verificationEmail }),
  //       });

  //       if (response.ok) {
  //         // Backend handles validation and session, client redirects
  //         router.push("/super-admin/dashboard");
  //       } else {
  //         alert("Access denied. Check your credentials.");
  //       }
  //     } catch (error) {
  //       alert("An error occurred during verification.");
  //     }
  //   };

  //   const handleLogout = async () => {
  //     // Call your backend to log out the user and invalidate the session
  //     await fetch("/api/super-admin/logout", { method: "POST" });
  //     // The client side state and session are then cleared
  //     setIsVerified(false);
  //     setCurrentSuperAdmin(null);
  //     router.push("/super-admin/login");
  //   };

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
            Enter your authorized email address to access the dashboard
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
      </Card>
    </div>
  );
}
