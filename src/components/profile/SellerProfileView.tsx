
import React, { useState, useEffect } from 'react';
import { SellerUser } from '@/services/db';
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { websiteData } from '@/data/websiteData';

interface SellerProfileViewProps {
  user: SellerUser;
  isOwnProfile?: boolean;
}

const SellerProfileView = ({ user, isOwnProfile = true }: SellerProfileViewProps) => {
  const navigate = useNavigate();
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // For demo purposes, we'll show some sample products from the websiteData
    // In a real app, you'd filter products by the seller's ID
    const sampleProducts = websiteData
      .filter((_, index) => index >= 3 && index < 6) // Take different items than developer view
      .map(website => ({
        ...website,
        price: Math.floor(Math.random() * 50) + 30, // Random price between $30-$80
        purchases: Math.floor(Math.random() * 50) // Random number of purchases
      }));
      
    setSellerProducts(sampleProducts);
  }, [user.id]);
  
  const handlePreviewProduct = (websiteUrl: string) => {
    navigate(`/preview?url=${encodeURIComponent(websiteUrl)}`);
  };
  
  const handlePurchaseProduct = (productId: string) => {
    // In a real app, this would navigate to a checkout page or add to cart
    navigate(`/checkout?product=${productId}`);
  };

  return (
    <div className="mb-6">
      <div className="bg-green-50 p-4 rounded-lg mb-4">
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
            <p className="text-gray-700 flex items-center">
              {user.rating ? (
                <>
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  {user.rating}/5
                </>
              ) : (
                "Not rated yet"
              )}
            </p>
          </div>
        </div>
      </div>

      {sellerProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Products for Sale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sellerProducts.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded font-medium text-sm">
                    ${product.price}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900">{product.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{product.purchases} purchases</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handlePreviewProduct(product.websiteUrl)}
                    >
                      <Eye size={14} />
                      Preview
                    </Button>
                    {!isOwnProfile && (
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handlePurchaseProduct(product.id)}
                      >
                        <ShoppingCart size={14} />
                        Purchase
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfileView;
