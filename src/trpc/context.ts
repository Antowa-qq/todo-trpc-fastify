import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export const context = ({ req, res }: CreateFastifyContextOptions) => {
  return { req, res, user: null };
};

export type Context = inferAsyncReturnType<typeof context>;
export interface ContextWithUser extends Omit<Context, 'user'> {
  user: {
    userId: number;
  };
}
