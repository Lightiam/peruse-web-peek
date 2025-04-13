
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminUser, Transaction, getAllTransactions, getUsersByRole } from '@/services/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions
        const transactionData = await getAllTransactions();
        setTransactions(transactionData);
        
        // Fetch users by role
        const developerData = await getUsersByRole('developer');
        const sellerData = await getUsersByRole('seller');
        const userData = await getUsersByRole('user');
        
        setDevelopers(developerData);
        setSellers(sellerData);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: "Error",
          description: "Failed to load administrative data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Make sure only admins can access this page
  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-700 mb-6">You don't have permission to access this page.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const adminUser = currentUser as AdminUser;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Badge variant="outline" className="text-purple-800 bg-purple-50 border-purple-200 px-3 py-1">
              Super Admin
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Dashboard Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Total registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{users.length + developers.length + sellers.length}</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <span className="inline-block mr-4">Developers: {developers.length}</span>
                      <span className="inline-block mr-4">Sellers: {sellers.length}</span>
                      <span className="inline-block">Regular Users: {users.length}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>Platform transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{transactions.length}</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <span className="inline-block mr-4">
                        Completed: {transactions.filter(t => t.status === 'completed').length}
                      </span>
                      <span className="inline-block">
                        Pending: {transactions.filter(t => t.status === 'pending').length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>Platform commission</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      $
                      {transactions
                        .filter(t => t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount * 0.05, 0)
                        .toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      5% commission on all transactions
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="developers">Developers</TabsTrigger>
                  <TabsTrigger value="sellers">Sellers</TabsTrigger>
                </TabsList>
                
                {/* Transactions Tab */}
                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Transactions</CardTitle>
                      <CardDescription>
                        Monitor and manage platform transactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {transactions.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Buyer</TableHead>
                                <TableHead>Seller</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell className="font-medium">{transaction.id.substring(0, 8)}</TableCell>
                                  <TableCell>{transaction.buyerId}</TableCell>
                                  <TableCell>{transaction.sellerId}</TableCell>
                                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        transaction.status === 'completed'
                                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                          : transaction.status === 'pending'
                                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                                      }
                                    >
                                      {transaction.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">
                                      Details
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No transactions yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Developers Tab */}
                <TabsContent value="developers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Developers</CardTitle>
                      <CardDescription>
                        Manage and monitor developers on the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {developers.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Skills</TableHead>
                                <TableHead>Hourly Rate</TableHead>
                                <TableHead>Completed Projects</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {developers.map((dev) => (
                                <TableRow key={dev.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={dev.avatar} />
                                        <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{dev.name}</p>
                                        <p className="text-sm text-muted-foreground">{dev.email}</p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{dev.skills || 'Not specified'}</TableCell>
                                  <TableCell>${dev.hourlyRate || '0'}/hr</TableCell>
                                  <TableCell>{dev.completedProjects || 0}</TableCell>
                                  <TableCell>{dev.rating ? `${dev.rating}/5` : 'Not rated'}</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">
                                      View Profile
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No developers registered yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Sellers Tab */}
                <TabsContent value="sellers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sellers</CardTitle>
                      <CardDescription>
                        Manage and monitor sellers on the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {sellers.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Business Name</TableHead>
                                <TableHead>Product Types</TableHead>
                                <TableHead>Total Sales</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sellers.map((seller) => (
                                <TableRow key={seller.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={seller.avatar} />
                                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{seller.name}</p>
                                        <p className="text-sm text-muted-foreground">{seller.email}</p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{seller.businessName || seller.name}</TableCell>
                                  <TableCell>{seller.productTypes || 'Not specified'}</TableCell>
                                  <TableCell>{seller.totalSales || 0}</TableCell>
                                  <TableCell>{seller.rating ? `${seller.rating}/5` : 'Not rated'}</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">
                                      View Products
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No sellers registered yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
