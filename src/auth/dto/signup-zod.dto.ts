import { z } from 'zod';

// Define the user role enum
const UserRoleEnum = z.enum(['user', 'admin']);

// Define the schema using Zod
export const createUserSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name cannot be empty')
      .max(100, 'Name is too long'),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password is too long')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // At least one lowercase letter
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one uppercase letter
      .regex(/\d/, 'Password must contain at least one number') // At least one number
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ), // At least one special character

    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),

    role: UserRoleEnum, // Ensures 'user' or 'admin' is provided
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Specify where the error will occur
    message: 'Passwords must match',
  });

// Example TypeScript type generated from Zod schema
export type CreateUserZodDto = z.infer<typeof createUserSchema>;
