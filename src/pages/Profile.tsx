import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { updateUser, User, DeveloperUser, SellerUser, AdminUser } from '../services/db';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebsiteGrid from '@/components/WebsiteGrid';
import { websiteData } from '@/data/websiteData';

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  bio: z.string().optional(),
  avatar: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userWebsites, setUserWebsites] = useState<any[]>([]);
  
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    
    const sampleUserWebsites = websiteData.slice(0, 2);
    setUserWebsites(sampleUserWebsites);
  }, [currentUser, navigate]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || '',
      bio: currentUser?.bio || '',
      avatar: currentUser?.avatar || ''
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
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
        const devUser = currentUser as DeveloperUser;
        return (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Developer Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Skills</p>
                <p className="text-gray-700">{devUser.skills || "No skills listed"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Hourly Rate</p>
                <p className="text-gray-700">${devUser.hourlyRate || "0"}/hour</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Available for Chat</p>
                <p className="text-gray-700">{devUser.availableForChat ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Projects</p>
                <p className="text-gray-700">{devUser.completedProjects || 0}</p>
              </div>
            </div>
          </div>
        );
      case 'seller':
        const sellerUser = currentUser as SellerUser;
        return (
          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Seller Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Business Name</p>
                <p className="text-gray-700">{sellerUser.businessName || currentUser.name}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Product Types</p>
                <p className="text-gray-700">{sellerUser.productTypes || "No product types listed"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-gray-700">{sellerUser.totalSales || 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-gray-700">{sellerUser.rating ? `${sellerUser.rating}/5` : "Not rated yet"}</p>
              </div>
            </div>
          </div>
        );
      case 'admin':
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
          
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Avatar className="h-24 w-24 mr-6">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-xl">{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {renderRoleSpecificContent()}
              
              {currentUser.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{currentUser.bio}</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself and your work..." 
                            className="resize-none min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Update Profile
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Websites</h2>
              <Button variant="outline" onClick={() => navigate('/add-website')}>
                Add Website
              </Button>
            </div>
            
            {userWebsites.length > 0 ? (
              <WebsiteGrid websites={userWebsites} selectedCategory="All" />
            ) : (
              <Alert>
                <AlertTitle>No websites yet</AlertTitle>
                <AlertDescription>
                  You haven't added any websites to your profile yet. Add your first website to showcase your work.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
