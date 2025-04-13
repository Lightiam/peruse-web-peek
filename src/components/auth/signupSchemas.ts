
import { z } from 'zod';
import { baseUserSchema } from './BaseSignupForm';

// Extended schemas for different user types
export const developerSchema = baseUserSchema.extend({
  skills: z.string().optional(),
  bio: z.string().optional(),
  hourlyRate: z.string().optional(),
  availableForChat: z.boolean().default(true),
});

export const sellerSchema = baseUserSchema.extend({
  businessName: z.string().optional(),
  businessDescription: z.string().optional(),
  productTypes: z.string().optional(),
});

export const adminSchema = baseUserSchema;

// Combine schemas into a discriminated union based on role
export const signupSchema = z.discriminatedUnion('role', [
  developerSchema.extend({ role: z.literal('developer') }),
  sellerSchema.extend({ role: z.literal('seller') }),
  adminSchema.extend({ role: z.literal('admin') }),
  baseUserSchema.extend({ role: z.literal('user') }),
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type SignupFormValues = z.infer<typeof signupSchema>;
