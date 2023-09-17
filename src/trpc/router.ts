import userRouter from '@modules/user/user.router';
import authRouter from '@modules/auth/auth.router';
import listRouter from '@modules/list/list.router';
import taskRouter from '@modules/task/task.router';
import listPermissionRouter from '@modules/listPermission/listPermission.router';
import healthCheckRouter from '@/modules/healthcheck/healthcheck.router';

import { router } from './index';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  list: listRouter,
  task: taskRouter,
  listPermission: listPermissionRouter,
  healthcheck: healthCheckRouter,
});

export type AppRouter = typeof appRouter;
