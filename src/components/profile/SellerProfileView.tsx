
import React from 'react';
import { SellerUser } from '@/services/db';

interface SellerProfileViewProps {
  user: SellerUser;
}

const SellerProfileView = ({ user }: SellerProfileViewProps) => {
  return (
    <div className="mb-6 bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Seller Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500">Business Name</p>
          <p className="text-gray-700">{user.businessName || user.name}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500">Product Types</p>
          <p className="text-gray-700">{user.productTypes || "No product types listed"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Sales</p>
          <p className="text-gray-700">{user.totalSales || 0}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Rating</p>
          <p className="text-gray-700">{user.rating ? `${user.rating}/5` : "Not rated yet"}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfileView;
