
import { openDB, DBSchema } from 'idb';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
  bio?: string;
  avatar?: string;
  websites?: string[]; // Array of website IDs the user has added
  role: 'user' | 'developer' | 'seller' | 'admin';
}

export interface DeveloperUser extends BaseUser {
  role: 'developer';
  skills?: string;
  hourlyRate?: string;
  availableForChat?: boolean;
  rating?: number;
  completedProjects?: number;
}

export interface SellerUser extends BaseUser {
  role: 'seller';
  businessName?: string;
  businessDescription?: string;
  productTypes?: string;
  rating?: number;
  totalSales?: number;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
  lastActive?: string;
}

export type User = BaseUser | DeveloperUser | SellerUser | AdminUser;

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  timestamp: string;
  itemId?: string; // Product or service ID
  description: string;
}

interface PeruseDBSchema extends DBSchema {
  users: {
    key: string; // user.id
    value: User;
    indexes: {
      'by-email': string;
      'by-role': string;
    };
  };
  transactions: {
    key: string; // transaction.id
    value: Transaction;
    indexes: {
      'by-buyer': string;
      'by-seller': string;
      'by-status': string;
    };
  };
}

const DB_NAME = 'peruse-db';
const DB_VERSION = 1;
const USERS_STORE = 'users';
const TRANSACTIONS_STORE = 'transactions';

// Initialize the IndexedDB database
export const initDB = async () => {
  return openDB<PeruseDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create users store
      const usersStore = db.createObjectStore(USERS_STORE, { keyPath: 'id' });
      // Create indexes on the email and role fields for lookup
      usersStore.createIndex('by-email', 'email', { unique: true });
      usersStore.createIndex('by-role', 'role');

      // Create transactions store
      const transactionsStore = db.createObjectStore(TRANSACTIONS_STORE, { keyPath: 'id' });
      // Create indexes for transactions
      transactionsStore.createIndex('by-buyer', 'buyerId');
      transactionsStore.createIndex('by-seller', 'sellerId');
      transactionsStore.createIndex('by-status', 'status');
    },
  });
};

// User related functions
export const createUser = async (user: User): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(USERS_STORE, user);
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const db = await initDB();
  try {
    return await db.getFromIndex(USERS_STORE, 'by-email', email);
  } catch (error) {
    console.error('Error getting user by email:', error);
    return undefined;
  }
};

export const getUsersByRole = async (role: User['role']): Promise<User[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(USERS_STORE, 'by-role', role);
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
};

export const updateUser = async (user: User): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(USERS_STORE, user);
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

// Transaction related functions
export const createTransaction = async (transaction: Transaction): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(TRANSACTIONS_STORE, transaction);
    return true;
  } catch (error) {
    console.error('Error creating transaction:', error);
    return false;
  }
};

export const getTransactionsByBuyer = async (buyerId: string): Promise<Transaction[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(TRANSACTIONS_STORE, 'by-buyer', buyerId);
  } catch (error) {
    console.error('Error getting transactions by buyer:', error);
    return [];
  }
};

export const getTransactionsBySeller = async (sellerId: string): Promise<Transaction[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(TRANSACTIONS_STORE, 'by-seller', sellerId);
  } catch (error) {
    console.error('Error getting transactions by seller:', error);
    return [];
  }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const db = await initDB();
  try {
    return await db.getAll(TRANSACTIONS_STORE);
  } catch (error) {
    console.error('Error getting all transactions:', error);
    return [];
  }
};

export const updateTransaction = async (transaction: Transaction): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(TRANSACTIONS_STORE, transaction);
    return true;
  } catch (error) {
    console.error('Error updating transaction:', error);
    return false;
  }
};

// Generate a unique ID for records
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
