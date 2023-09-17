import { TRPCError } from '@trpc/server';
import { middleware } from '@/trpc/index';

import { AuthTokenService } from './auth-token.service';
import { TokenTypeEnum } from './auth.models';

const authTokenService = new AuthTokenService();

export const isAuthorized = middleware(async ({ ctx, next }) => {
  const { req } = ctx;

  const { authorization, Authorization } = req.headers;
  const authHeaderValue = authorization || (Authorization as string);

  if (!authHeaderValue) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const [bearer, token] = authHeaderValue.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw new TRPCError({ code: TRPCError.prototype.code });
  }

  const { sub: userId } = await authTokenService.validateToken(token, TokenTypeEnum.ACCESS_TOKEN);

  return next({
    ctx: {
      user: { userId: Number(userId) },
    },
  });
});
