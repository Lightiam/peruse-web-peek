import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateUser, User, DeveloperUser, SellerUser, AdminUser } from '../services/db';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { websiteData } from '@/data/websiteData';
import ProfileForm, { ProfileFormValues } from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import DeveloperProfileView from '@/components/profile/DeveloperProfileView';
import SellerProfileView from '@/components/profile/SellerProfileView';
import AdminProfileView from '@/components/profile/AdminProfileView';
import UserWebsites from '@/components/profile/UserWebsites';
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userWebsites, setUserWebsites] = useState<any[]>([]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    
    const sampleUserWebsites = websiteData.slice(0, 2);
    setUserWebsites(sampleUserWebsites);
  }, [currentUser, navigate]);

  const handleSubmit = async (data: ProfileFormValues) => {
    if (!currentUser) return;
    
    try {
      const updatedUser: User = {
        ...currentUser,
        name: data.name,
        bio: data.bio || '',
        avatar: data.avatar || ''
      };
      
      const success = await updateUser(updatedUser);
      
      if (success) {
        login(updatedUser);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
      } else {
        toast({
          title: "Error",
          description: "There was a problem updating your profile. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!currentUser) {
    return null;
  }

  const renderRoleSpecificContent = () => {
    switch(currentUser.role) {
      case 'developer':
        return <DeveloperProfileView user={currentUser as DeveloperUser} />;
      case 'seller':
        return <SellerProfileView user={currentUser as SellerUser} />;
      case 'admin':
        return <AdminProfileView user={currentUser as AdminUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home size={16} />
                Home
              </Button>
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-6">
              <ProfileHeader user={currentUser} />
              
              {renderRoleSpecificContent()}
              
              {currentUser.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{currentUser.bio}</p>
                </div>
              )}
              
              <ProfileForm currentUser={currentUser} onSubmit={handleSubmit} />
            </div>
          </div>
          
          <UserWebsites websites={userWebsites} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
