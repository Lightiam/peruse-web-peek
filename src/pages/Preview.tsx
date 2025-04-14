
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, ExternalLink, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const websiteUrl = searchParams.get('url');

    if (!websiteUrl) {
      setError('No URL provided');
      setLoading(false);
      return;
    }

    setUrl(websiteUrl);
    fetchPreview(websiteUrl);
  }, [location.search]);

  const fetchPreview = async (websiteUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      // Normalize URL (add https:// if missing)
      let normalizedUrl = websiteUrl;
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = 'https://' + normalizedUrl;
      }

      // In a real app, this would use a backend endpoint to fetch the preview
      // For now we'll simulate a response
      const response = await simulatePreviewFetch(normalizedUrl);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setImageData(response.preview);
    } catch (err) {
      console.error('Error fetching preview:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
      toast({
        title: "Preview Error",
        description: "Failed to generate website preview",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // This function simulates a backend call to get a website preview
  // In production, this would be replaced with an actual API call
  const simulatePreviewFetch = async (url: string): Promise<{preview?: string, error?: string}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, return a placeholder image
        if (url.includes('error')) {
          resolve({ error: 'Failed to generate preview for this website' });
        } else {
          // Use a placeholder image for the preview
          resolve({ 
            preview: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' 
          });
        }
      }, 1500);
    });
  };

  const handleRefresh = () => {
    if (url) {
      fetchPreview(url);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full overflow-hidden">
        <CardHeader className="bg-gray-100 p-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleGoBack} 
                title="Go back"
              >
                <ArrowLeft size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh} 
                title="Refresh"
                disabled={loading}
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleGoHome} 
                title="Home"
              >
                <Home size={16} />
              </Button>
            </div>
            <div className="flex-1 px-4">
              <div className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 truncate max-w-full">
                {url || 'No URL'}
              </div>
            </div>
            <div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')}
                className="flex items-center gap-1 text-gray-600 text-xs"
              >
                <ExternalLink size={14} />
                Open
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-sm text-gray-600">Generating website preview...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <p className="text-gray-800 font-medium">Failed to load preview</p>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
            </div>
          ) : imageData ? (
            <div className="w-full">
              <img 
                src={`data:image/png;base64,${imageData}`}
                alt="Website Preview" 
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50">
              <p className="text-gray-800 font-medium">No preview available</p>
              <p className="mt-2 text-sm text-gray-600">Enter a URL to generate a preview</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Preview;
