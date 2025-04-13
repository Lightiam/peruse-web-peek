
import { openDB, DBSchema } from 'idb';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
  bio?: string;
  avatar?: string;
  websites?: string[]; // Array of website IDs the user has added
}

interface PeruseDBSchema extends DBSchema {
  users: {
    key: string; // user.id
    value: User;
    indexes: {
      'by-email': string;
    };
  };
}

const DB_NAME = 'peruse-db';
const DB_VERSION = 1;
const USERS_STORE = 'users';

// Initialize the IndexedDB database
export const initDB = async () => {
  return openDB<PeruseDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create users store
      const usersStore = db.createObjectStore(USERS_STORE, { keyPath: 'id' });
      // Create an index on the email field for lookup
      usersStore.createIndex('by-email', 'email', { unique: true });
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

// Generate a unique ID for users
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
