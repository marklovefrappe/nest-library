import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
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
});

export type LoginZodDto = z.infer<typeof loginSchema>;
