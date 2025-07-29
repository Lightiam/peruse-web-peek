import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface InlinePreviewProps {
  url: string;
  onClose: () => void;
  className?: string;
}

const InlinePreview: React.FC<InlinePreviewProps> = ({ url, onClose, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a working screenshot preview
  const createInlinePreview = (websiteUrl: string) => {
    // Ensure URL has protocol
    const formattedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    
    return (
      <div className="w-full h-full flex flex-col">
        <iframe
          src={`https://urlpreview.vercel.app/api/preview?url=${encodeURIComponent(formattedUrl)}`}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            // Fallback to placeholder on error
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-600">Loading preview...</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenExternal = () => {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 truncate max-w-xs">
            {url}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExpandToggle}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenExternal}
            className="h-8 w-8 p-0"
          >
            <ExternalLink size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X size={14} />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`relative bg-white ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
        {createInlinePreview(url)}
      </div>
    </div>
  );
};

export default InlinePreview;