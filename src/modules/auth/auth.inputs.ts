import { TypeOf, object, string } from 'zod';

export const loginSchema = object({
  login: string({ required_error: 'Login is required' }).min(5).max(50),
  password: string({ required_error: 'Password is required' }).min(8).max(50),
});

export const registrationSchema = object({
  login: string({ required_error: 'Login is required' }).min(5).max(50),
  password: string({ required_error: 'Password is required' }).min(8).max(50),
  name: string({ required_error: 'Name is required' }).min(1).max(50),
});

export const refreshTokensSchema = object({
  refreshToken: string({ required_error: 'Refresh is required' }),
});

export type LoginInput = TypeOf<typeof loginSchema>;
export type RefreshTokensInput = TypeOf<typeof refreshTokensSchema>;
export type RegistrationInput = TypeOf<typeof registrationSchema>;
