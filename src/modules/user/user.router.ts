import { router } from '@/trpc/index';
import { isAuthorizedProcedure } from '@/trpc/procedure';

import { UserService } from './user.service';

const userService = new UserService();

const userRouter = router({
  getMe: isAuthorizedProcedure.query(({ ctx: { user } }) => userService.getMe(user.userId)),
});

export default userRouter;
