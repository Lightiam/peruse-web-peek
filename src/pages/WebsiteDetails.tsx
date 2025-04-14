
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Phone, Mail, Calendar, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { websiteData, WebsiteDetailsData } from '@/data/websiteData';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const WebsiteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<WebsiteDetailsData | null>(null);

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
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-2"
        >
          <ArrowLeft size={16} />
          Back to websites
        </Button>
        <h1 className="text-3xl font-bold">{website.title}</h1>
        <div className="flex items-center mt-2">
          <Badge variant="outline" className="mr-2">{website.category}</Badge>
          <span className="text-sm text-gray-500">Created on {website.creationDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Main Image */}
          <Card>
            <CardContent className="p-0">
              <div className="w-full aspect-video overflow-hidden">
                <img 
                  src={website.imageUrl} 
                  alt={`${website.title} main preview`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Images Carousel */}
          {website.additionalImages && website.additionalImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {website.additionalImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="aspect-video overflow-hidden rounded-lg">
                            <img 
                              src={image} 
                              alt={`${website.title} screenshot ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this website</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{website.longDescription}</p>
              
              {website.technologies && website.technologies.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Code size={16} className="mr-2" />
                    <h3 className="font-medium">Technologies used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {website.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline"
                onClick={handlePreview}
                className="w-full flex items-center gap-2 justify-center"
              >
                Preview Website
              </Button>
              <Button 
                variant="default"
                onClick={() => window.open(website.websiteUrl.startsWith('http') ? website.websiteUrl : `https://${website.websiteUrl}`, '_blank')}
                className="w-full flex items-center gap-2 justify-center"
              >
                <ExternalLink size={16} />
                Visit Website
              </Button>
            </CardContent>
          </Card>

          {/* Creator Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{website.creatorName}</h3>
                <p className="text-sm text-gray-500 mt-1">Website Creator</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="mr-3 text-gray-500" />
                  <a href={`mailto:${website.creatorEmail}`} className="text-blue-600 hover:underline">
                    {website.creatorEmail}
                  </a>
                </div>
                {website.creatorPhone && (
                  <div className="flex items-center">
                    <Phone size={16} className="mr-3 text-gray-500" />
                    <a href={`tel:${website.creatorPhone}`} className="text-blue-600 hover:underline">
                      {website.creatorPhone}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-3 text-gray-500" />
                  <span className="text-gray-700">
                    Member since {new Date(website.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;
