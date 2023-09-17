import { router } from '@/trpc/index';
import { isAuthorizedProcedure } from '@/trpc/procedure';

import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './task.inputs';
import { TaskController } from './task.controller';
import { ListService } from '@modules/list/list.service';

const taskController = new TaskController();
const listService = new ListService();

const taskRouter = router({
  create: isAuthorizedProcedure
    .input(createTaskSchema)
    .use(async ({ input, ctx, next }) => {
      await listService.checkPermission(input.listId, ctx.user.userId, 'CREATE');
      return next();
    })
    .mutation((data) => taskController.create(data.input)),
  update: isAuthorizedProcedure
    .input(updateTaskSchema)
    .use(async ({ input, ctx, next }) => {
      await listService.checkPermission(input.listId, ctx.user.userId, 'UPDATE');
      return next();
    })
    .mutation((data) => taskController.update(data.input)),
  delete: isAuthorizedProcedure
    .input(deleteTaskSchema)
    .use(async ({ input, ctx, next }) => {
      await listService.checkPermission(input.listId, ctx.user.userId, 'DELETE');
      return next();
    })
    .mutation((data) => taskController.delete(data.input)),
});

export default taskRouter;
