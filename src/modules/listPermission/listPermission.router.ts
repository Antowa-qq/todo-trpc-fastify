import { router } from '@/trpc/index';
import { isAuthorizedProcedure } from '@/trpc/procedure';

import { upsertListPermissionSchema } from './listPermission.inputs';
import { ListPermissionController } from './listPermission.controller';

const listPermissionController = new ListPermissionController();

const listPermissionRouter = router({
  upsert: isAuthorizedProcedure
    .input(upsertListPermissionSchema)
    .mutation((data) => listPermissionController.upsert(data.input, data.ctx)),
});

export default listPermissionRouter;
