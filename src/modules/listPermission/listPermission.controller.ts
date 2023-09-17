import { ContextWithUser } from '@/trpc/context';

import { UpsertListPermissionInput } from './listPermission.inputs';
import { listPermissionService } from './listPermission.service';

export class ListPermissionController {
  private listPermissionService = new listPermissionService();

  upsert(input: UpsertListPermissionInput, ctx: ContextWithUser) {
    const userId = ctx.user.userId;
    const { listId, targetUserId, permissions } = input;

    return this.listPermissionService.upsert(listId, userId, targetUserId, permissions);
  }
}
