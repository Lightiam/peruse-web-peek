import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser, generateId, getUserByEmail, User, DeveloperUser, SellerUser, AdminUser } from '../services/db';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BaseSignupForm from '@/components/auth/BaseSignupForm';
import DeveloperSignupForm from '@/components/auth/DeveloperSignupForm';
import SellerSignupForm from '@/components/auth/SellerSignupForm';
import AdminSignupForm from '@/components/auth/AdminSignupForm';
import { signupSchema, SignupFormValues } from '@/components/auth/signupSchemas';
import { useAuth } from '@/contexts/AuthContext';

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

  useEffect(() => {
    form.setValue('role', role);
  }, [role, form]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const existingUser = await getUserByEmail(data.email);
      if (existingUser) {
        toast({
          title: "Error",
          description: "Email already in use. Please try another or sign in.",
          variant: "destructive"
        });
        return;
      }

      const userId = generateId();
      let newUser: User;
      
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
        
        login(newUser);
        
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
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost">
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>
        </Link>
      </div>
      
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
                  <BaseSignupForm form={form} />
                  
                  <TabsContent value="developer">
                    <DeveloperSignupForm form={form} />
                  </TabsContent>
                  
                  <TabsContent value="seller">
                    <SellerSignupForm form={form} />
                  </TabsContent>
                  
                  <TabsContent value="admin">
                    <AdminSignupForm />
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
