"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin" | "super_admin"
  requireApproval?: boolean
}

export default function ProtectedRoute({ children, requiredRole, requireApproval = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <Card className="p-8 max-w-md text-center">
          <Shield className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this page.</p>
          <Button onClick={() => router.push("/")} className="bg-amber-400 text-black hover:bg-amber-500">
            Go to Homepage
          </Button>
        </Card>
      </div>
    )
  }

  if (requiredRole && user.role !== requiredRole && user.role !== "super_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <Card className="p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => router.push("/")} className="bg-amber-400 text-black hover:bg-amber-500">
            Go to Homepage
          </Button>
        </Card>
      </div>
    )
  }

  if (requireApproval && user.status !== "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <Card className="p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Approval Pending</h2>
          <p className="text-gray-600 mb-6">
            Your account is pending approval from our administrators. You'll receive an email once approved.
          </p>
          <Button onClick={() => router.push("/")} className="bg-amber-400 text-black hover:bg-amber-500">
            Go to Homepage
          </Button>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
