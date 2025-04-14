
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUsersByRole } from '@/services/db';
import { Shield, Lock } from 'lucide-react';

const AdminSignupForm: React.FC = () => {
  const [isAdminExists, setIsAdminExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingAdmin = async () => {
      try {
        const admins = await getUsersByRole('admin');
        setIsAdminExists(admins.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking existing admin:', error);
        setIsLoading(false);
      }
    };

    checkExistingAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-md ${isAdminExists ? 'bg-red-50 border border-red-200' : 'bg-purple-50 border border-purple-200'}`}>
      {isAdminExists ? (
        <Alert variant="destructive" className="border-0 bg-transparent">
          <Lock className="h-4 w-4 mr-2" />
          <AlertDescription className="text-red-800">
            Admin registration is restricted. The system already has an administrator.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-purple-700 mt-0.5" />
          <div>
            <p className="text-purple-800 text-sm font-medium mb-1">
              Administrator Account
            </p>
            <p className="text-purple-800 text-sm">
              You are registering as the system administrator with full access to all features including user management and transaction monitoring.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSignupForm;
