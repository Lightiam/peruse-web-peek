
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, generateId, getUserByEmail, User, DeveloperUser, SellerUser, AdminUser } from '../services/db';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const userSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
  confirmPassword: z.string(),
  role: z.enum(['user', 'developer', 'seller', 'admin']),
});

const developerSchema = userSchema.extend({
  skills: z.string().optional(),
  bio: z.string().optional(),
  hourlyRate: z.string().optional(),
  availableForChat: z.boolean().default(true),
});

const sellerSchema = userSchema.extend({
  businessName: z.string().optional(),
  businessDescription: z.string().optional(),
  productTypes: z.string().optional(),
});

const adminSchema = userSchema;

// Combine schemas into a discriminated union based on role
const signupSchema = z.discriminatedUnion('role', [
  developerSchema.extend({ role: z.literal('developer') }),
  sellerSchema.extend({ role: z.literal('seller') }),
  adminSchema.extend({ role: z.literal('admin') }),
  userSchema.extend({ role: z.literal('user') }),
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<'user' | 'developer' | 'seller' | 'admin'>('user');
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    }
  });

  // Update form values when role changes
  React.useEffect(() => {
    form.setValue('role', role);
  }, [role, form]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // Check if user already exists
      const existingUser = await getUserByEmail(data.email);
      if (existingUser) {
        toast({
          title: "Error",
          description: "Email already in use. Please try another or sign in.",
          variant: "destructive"
        });
        return;
      }

      // Create new user based on role
      const userId = generateId();
      let newUser: User;
      
      // Create user based on role type
      if (data.role === 'developer') {
        const developerUser: DeveloperUser = {
          id: userId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'developer',
          websites: [],
          skills: data.skills || '',
          bio: data.bio || '',
          hourlyRate: data.hourlyRate || '',
          availableForChat: data.availableForChat ?? true,
          rating: undefined,
          completedProjects: 0
        };
        newUser = developerUser;
      } 
      else if (data.role === 'seller') {
        const sellerUser: SellerUser = {
          id: userId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'seller',
          websites: [],
          businessName: data.businessName || '',
          businessDescription: data.businessDescription || '',
          productTypes: data.productTypes || '',
          rating: undefined,
          totalSales: 0
        };
        newUser = sellerUser;
      }
      else if (data.role === 'admin') {
        const adminUser: AdminUser = {
          id: userId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'admin',
          websites: [],
          lastActive: new Date().toISOString()
        };
        newUser = adminUser;
      }
      else {
        // Regular user
        newUser = {
          id: userId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'user',
          websites: []
        };
      }
      
      const success = await createUser(newUser);
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your account has been created."
        });
        
        // Log the user in
        login(newUser);
        
        // Redirect to home
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "There was a problem creating your account. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-blue-600">Peruse</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="user" onValueChange={(value) => setRole(value as typeof role)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="developer">Developer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <TabsContent value="developer">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills (comma separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="React, TypeScript, Node.js" {...field} />
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
                                placeholder="Tell clients about your experience and expertise..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hourly Rate ($)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="availableForChat"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Available for Chat</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Allow potential clients to chat with you directly
                              </div>
                            </div>
                            <FormControl>
                              <input 
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="accent-blue-600 h-4 w-4"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="seller">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your business and the products you offer..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="productTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Types</FormLabel>
                            <FormControl>
                              <Input placeholder="Website Templates, Plugins, UI Kits" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="admin">
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                      <p className="text-yellow-800 text-sm">
                        Admin accounts have access to system-wide features including transaction monitoring and user management. 
                        Admin registration requires approval.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign up
                  </Button>
                </form>
              </Form>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Signup;
