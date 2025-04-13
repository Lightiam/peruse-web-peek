
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export interface WebsiteCardProps {
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  websiteUrl,
  category
}) => {
  const navigate = useNavigate();
  
  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    // Instead of navigating to external URL, we'll navigate to an internal preview page
    navigate(`/preview?url=${encodeURIComponent(websiteUrl)}`);
  };
  
  const handleDetails = () => {
    navigate(`/website-details?title=${encodeURIComponent(title)}`);
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden bg-gray-100 border-b border-gray-200">
          <img 
            src={imageUrl} 
            alt={`${title} preview`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="font-semibold text-lg mb-1 text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <Button 
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 p-0"
            onClick={handleDetails}
          >
            See details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 p-0"
            onClick={handlePreview}
          >
            <Eye size={14} className="mr-1" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;
