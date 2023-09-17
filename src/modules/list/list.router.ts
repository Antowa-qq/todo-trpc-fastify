import { router } from '@/trpc/index';
import { isAuthorizedProcedure } from '@/trpc/procedure';

import { createListSchema, deleteListSchema, updateListSchema, getAllListSchema } from './list.inputs';
import { ListController } from './list.controller';

const listController = new ListController();

const listRouter = router({
  create: isAuthorizedProcedure.input(createListSchema).mutation((data) => listController.create(data.input, data.ctx)),
  update: isAuthorizedProcedure.input(updateListSchema).mutation((data) => listController.update(data.input, data.ctx)),
  delete: isAuthorizedProcedure.input(deleteListSchema).mutation((data) => listController.delete(data.input, data.ctx)),
  getAll: isAuthorizedProcedure.input(getAllListSchema).query((data) => listController.getAll(data.input, data.ctx)),
});

export default listRouter;
