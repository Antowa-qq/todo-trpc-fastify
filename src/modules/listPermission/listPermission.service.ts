import { db } from '@utils/prisma';
import { ListPermissionEnum } from '@prisma/client';
import { ListService } from '@modules/list/list.service';

export class listPermissionService {
  private listService = new ListService();

  async upsert(listId: number, userId: number, targetUserId: number, permissions: ListPermissionEnum[]) {
    await this.listService.checkOwner(listId, userId);

    const permission = await db.listPermission.upsert({
      create: { listId, userId: targetUserId, permissions },
      update: { permissions },
      where: {
        listId_userId: {
          listId,
          userId: targetUserId,
        },
      },
    });
    return permission;
  }
}
