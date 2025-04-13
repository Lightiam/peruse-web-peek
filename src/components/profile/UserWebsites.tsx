
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebsiteGrid from '@/components/WebsiteGrid';

interface UserWebsitesProps {
  websites: any[];
}

const UserWebsites = ({ websites }: UserWebsitesProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Websites</h2>
        <Button variant="outline" onClick={() => navigate('/add-website')}>
          Add Website
        </Button>
      </div>
      
      {websites.length > 0 ? (
        <WebsiteGrid websites={websites} selectedCategory="All" />
      ) : (
        <Alert>
          <AlertTitle>No websites yet</AlertTitle>
          <AlertDescription>
            You haven't added any websites to your profile yet. Add your first website to showcase your work.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UserWebsites;
