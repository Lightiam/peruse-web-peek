
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

export interface MVP {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  websiteUrl: string;
  imageUrl: string;
  category: string;
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  creationDate: string;
  upvotes: number;
  comments: number;
  reposts: number;
  views: number;
  technologies?: string[];
  additionalImages?: string[];
  ranking?: number;
}

export interface Comment {
  id: string;
  mvpId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Like {
  id: string;
  mvpId: string;
  userId: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  publishDate: string;
  tags: string[];
  views: number;
  likes: number;
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
  mvps: {
    key: string; // mvp.id
    value: MVP;
    indexes: {
      'by-creator': string;
      'by-category': string;
      'by-ranking': number;
    };
  };
  comments: {
    key: string; // comment.id
    value: Comment;
    indexes: {
      'by-mvp': string;
      'by-user': string;
    };
  };
  likes: {
    key: string; // like.id
    value: Like;
    indexes: {
      'by-mvp': string;
      'by-user': string;
    };
  };
  blogPosts: {
    key: string; // blogPost.id
    value: BlogPost;
    indexes: {
      'by-author': string;
      'by-date': string;
    };
  };
}

const DB_NAME = 'mvppeek-db';
const DB_VERSION = 2;
const USERS_STORE = 'users';
const TRANSACTIONS_STORE = 'transactions';
const MVPS_STORE = 'mvps';
const COMMENTS_STORE = 'comments';
const LIKES_STORE = 'likes';
const BLOG_POSTS_STORE = 'blogPosts';

// Initialize the IndexedDB database
export const initDB = async () => {
  return openDB<PeruseDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create users store
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const usersStore = db.createObjectStore(USERS_STORE, { keyPath: 'id' });
        usersStore.createIndex('by-email', 'email', { unique: true });
        usersStore.createIndex('by-role', 'role');
      }

      // Create transactions store
      if (!db.objectStoreNames.contains(TRANSACTIONS_STORE)) {
        const transactionsStore = db.createObjectStore(TRANSACTIONS_STORE, { keyPath: 'id' });
        transactionsStore.createIndex('by-buyer', 'buyerId');
        transactionsStore.createIndex('by-seller', 'sellerId');
        transactionsStore.createIndex('by-status', 'status');
      }

      // Create MVPs store
      if (!db.objectStoreNames.contains(MVPS_STORE)) {
        const mvpsStore = db.createObjectStore(MVPS_STORE, { keyPath: 'id' });
        mvpsStore.createIndex('by-creator', 'creatorId');
        mvpsStore.createIndex('by-category', 'category');
        mvpsStore.createIndex('by-ranking', 'ranking');
      }

      // Create comments store
      if (!db.objectStoreNames.contains(COMMENTS_STORE)) {
        const commentsStore = db.createObjectStore(COMMENTS_STORE, { keyPath: 'id' });
        commentsStore.createIndex('by-mvp', 'mvpId');
        commentsStore.createIndex('by-user', 'userId');
      }

      // Create likes store
      if (!db.objectStoreNames.contains(LIKES_STORE)) {
        const likesStore = db.createObjectStore(LIKES_STORE, { keyPath: 'id' });
        likesStore.createIndex('by-mvp', 'mvpId');
        likesStore.createIndex('by-user', 'userId');
      }

      // Create blog posts store
      if (!db.objectStoreNames.contains(BLOG_POSTS_STORE)) {
        const blogPostsStore = db.createObjectStore(BLOG_POSTS_STORE, { keyPath: 'id' });
        blogPostsStore.createIndex('by-author', 'authorId');
        blogPostsStore.createIndex('by-date', 'publishDate');
      }
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

// MVP related functions
export const createMVP = async (mvp: MVP): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(MVPS_STORE, mvp);
    return true;
  } catch (error) {
    console.error('Error creating MVP:', error);
    return false;
  }
};

export const getAllMVPs = async (): Promise<MVP[]> => {
  const db = await initDB();
  try {
    return await db.getAll(MVPS_STORE);
  } catch (error) {
    console.error('Error getting all MVPs:', error);
    return [];
  }
};

export const getMVPById = async (id: string): Promise<MVP | undefined> => {
  const db = await initDB();
  try {
    return await db.get(MVPS_STORE, id);
  } catch (error) {
    console.error('Error getting MVP by id:', error);
    return undefined;
  }
};

export const getMVPsByCreator = async (creatorId: string): Promise<MVP[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(MVPS_STORE, 'by-creator', creatorId);
  } catch (error) {
    console.error('Error getting MVPs by creator:', error);
    return [];
  }
};

export const getMVPsByCategory = async (category: string): Promise<MVP[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(MVPS_STORE, 'by-category', category);
  } catch (error) {
    console.error('Error getting MVPs by category:', error);
    return [];
  }
};

export const updateMVP = async (mvp: MVP): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(MVPS_STORE, mvp);
    return true;
  } catch (error) {
    console.error('Error updating MVP:', error);
    return false;
  }
};

// Comment related functions
export const createComment = async (comment: Comment): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(COMMENTS_STORE, comment);
    return true;
  } catch (error) {
    console.error('Error creating comment:', error);
    return false;
  }
};

export const getCommentsByMVP = async (mvpId: string): Promise<Comment[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(COMMENTS_STORE, 'by-mvp', mvpId);
  } catch (error) {
    console.error('Error getting comments by MVP:', error);
    return [];
  }
};

export const getCommentsByUser = async (userId: string): Promise<Comment[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(COMMENTS_STORE, 'by-user', userId);
  } catch (error) {
    console.error('Error getting comments by user:', error);
    return [];
  }
};

// Like related functions
export const createLike = async (like: Like): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(LIKES_STORE, like);
    return true;
  } catch (error) {
    console.error('Error creating like:', error);
    return false;
  }
};

export const getLikesByMVP = async (mvpId: string): Promise<Like[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(LIKES_STORE, 'by-mvp', mvpId);
  } catch (error) {
    console.error('Error getting likes by MVP:', error);
    return [];
  }
};

export const getUserLikeForMVP = async (mvpId: string, userId: string): Promise<Like | undefined> => {
  const db = await initDB();
  try {
    const likes = await db.getAllFromIndex(LIKES_STORE, 'by-mvp', mvpId);
    return likes.find(like => like.userId === userId);
  } catch (error) {
    console.error('Error getting user like for MVP:', error);
    return undefined;
  }
};

export const deleteLike = async (likeId: string): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.delete(LIKES_STORE, likeId);
    return true;
  } catch (error) {
    console.error('Error deleting like:', error);
    return false;
  }
};

// Blog related functions
export const createBlogPost = async (blogPost: BlogPost): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(BLOG_POSTS_STORE, blogPost);
    return true;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return false;
  }
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const db = await initDB();
  try {
    return await db.getAll(BLOG_POSTS_STORE);
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  const db = await initDB();
  try {
    return await db.get(BLOG_POSTS_STORE, id);
  } catch (error) {
    console.error('Error getting blog post by id:', error);
    return undefined;
  }
};

export const getBlogPostsByAuthor = async (authorId: string): Promise<BlogPost[]> => {
  const db = await initDB();
  try {
    return await db.getAllFromIndex(BLOG_POSTS_STORE, 'by-author', authorId);
  } catch (error) {
    console.error('Error getting blog posts by author:', error);
    return [];
  }
};

export const updateBlogPost = async (blogPost: BlogPost): Promise<boolean> => {
  const db = await initDB();
  try {
    await db.put(BLOG_POSTS_STORE, blogPost);
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
};

// Ranking algorithm
export const calculateRanking = (mvp: MVP): number => {
  const score = (
    mvp.upvotes * 3 + // Quality indicator
    mvp.comments * 2 + // Engagement depth
    mvp.reposts * 4 + // Viral potential
    mvp.views * 0.1 + // Reach indicator
    getRecencyBonus(mvp.creationDate) // Time decay factor
  );
  return Math.round(score * 100) / 100;
};

const getRecencyBonus = (creationDate: string): number => {
  const now = new Date();
  const created = new Date(creationDate);
  const hoursDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  
  if (hoursDiff <= 48) return 50; // Strong boost for new content
  if (hoursDiff <= 168) return 20; // Moderate boost for week-old content
  if (hoursDiff <= 720) return 5; // Small boost for month-old content
  return 0; // No boost for old content
};

// Update MVP rankings
export const updateMVPRankings = async (): Promise<void> => {
  const mvps = await getAllMVPs();
  
  for (const mvp of mvps) {
    mvp.ranking = calculateRanking(mvp);
    await updateMVP(mvp);
  }
};

// Generate a unique ID for records
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
