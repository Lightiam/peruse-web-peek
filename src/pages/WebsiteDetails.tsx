
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { websiteData } from '@/data/websiteData';
import { WebsiteCardProps } from '@/components/WebsiteCard';

const WebsiteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<WebsiteCardProps | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    
    if (title) {
      const foundWebsite = websiteData.find(site => 
        site.title === decodeURIComponent(title)
      );
      
      if (foundWebsite) {
        setWebsite(foundWebsite);
      }
    }
  }, [location.search]);

  const handlePreview = () => {
    if (website) {
      navigate(`/preview?url=${encodeURIComponent(website.websiteUrl)}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!website) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGoBack}
                className="mr-2"
              >
                <ArrowLeft size={16} />
              </Button>
              <CardTitle>Website Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Sorry, we couldn't find the website you're looking for.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGoBack}
                className="mr-4"
              >
                <ArrowLeft size={16} />
              </Button>
              <CardTitle>{website.title}</CardTitle>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {website.category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full aspect-video overflow-hidden">
            <img 
              src={website.imageUrl} 
              alt={`${website.title} preview`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">{website.description}</p>
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={handlePreview}
                className="flex items-center gap-2"
              >
                Preview Website
              </Button>
              <Button 
                variant="default"
                onClick={() => window.open(website.websiteUrl.startsWith('http') ? website.websiteUrl : `https://${website.websiteUrl}`, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Visit Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteDetails;
