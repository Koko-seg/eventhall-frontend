import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Settings, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export const SuperAdminHeader = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState<any>(null);

  useEffect(() => {
    const savedSuperAdmin = localStorage.getItem("currentSuperAdmin");
    if (savedSuperAdmin) {
      const admin = JSON.parse(savedSuperAdmin);
      setCurrentSuperAdmin(admin);
      setIsVerified(true);
    }
  }, []);

  const handleLogout = () => {
    setIsVerified(false);
    setCurrentSuperAdmin(null);

    localStorage.removeItem("currentSuperAdmin");
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              Super Admin Dashboard
            </div>
            <Badge
              variant="secondary"
              className="text-xs bg-purple-100 text-purple-800 mt-1 sm:mt-0"
            >
              <Shield className="w-3 h-3 mr-1" />
              Super Administrator
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
            <span className="text-sm text-gray-600 hidden sm:block">
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
  );
};
