
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AdminUser } from '@/services/db';

interface AdminProfileViewProps {
  user: AdminUser;
}

const AdminProfileView = ({ user }: AdminProfileViewProps) => {
  return (
    <div className="mb-6 bg-purple-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Admin Account</h3>
      <p className="text-gray-700">You have administrative privileges to monitor transactions and manage users.</p>
      <div className="mt-4">
        <Link to="/admin/dashboard">
          <Button variant="outline" className="text-purple-700 border-purple-300 hover:bg-purple-100">
            Go to Admin Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminProfileView;
