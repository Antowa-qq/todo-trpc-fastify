import { router } from '@/trpc/index';
import { publicProcedure } from '@/trpc/procedure';

import { loginSchema, refreshTokensSchema, registrationSchema } from './auth.inputs';
import { AuthController } from './auth.controller';

const authController = new AuthController();

const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation((data) => authController.login(data.input)),
  registration: publicProcedure.input(registrationSchema).mutation((data) => authController.registration(data.input)),
  refreshTokens: publicProcedure
    .input(refreshTokensSchema)
    .mutation((data) => authController.refreshTokens(data.input)),
});

export default authRouter;
