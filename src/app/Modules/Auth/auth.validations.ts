import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .max(100),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
