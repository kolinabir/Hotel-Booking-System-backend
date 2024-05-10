import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    userId: z.string().min(3).max(255),
    role: z.string().min(3).max(255),
  }),
});

export const UserValidationSchema = { createUserValidationSchema };
