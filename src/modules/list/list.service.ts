import { Prisma, List, ListPermissionEnum } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { db } from '@utils/prisma';

export class ListService {
  public async checkOwner(id: number, userId: number): Promise<void> {
    const list = await db.list.findUnique({ where: { id } });

    if (!list) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (list.userId !== userId) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
  }

  public async checkPermission(listId: number, targetUserId: number, permission: ListPermissionEnum): Promise<void> {
    const where: Prisma.ListWhereInput = {
      OR: [
        { userId: targetUserId, id: listId },
        { listPermission: { some: { userId: targetUserId, listId, permissions: { has: permission } } } },
      ],
    };

    const list = await db.list.findFirst({ where });

    if (!list) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
  }

  async create(data: Prisma.ListUncheckedCreateInput): Promise<List> {
    const list = await db.list.create({ data });
    return list;
  }

  async update(id: number, userId: number, data: Prisma.ListUncheckedUpdateInput) {
    await this.checkOwner(id, userId);

    const list = await db.list.update({ data, where: { id } });
    return list;
  }

  async delete(id: number, userId: number) {
    await this.checkOwner(id, userId);

    const list = await db.list.delete({ where: { id } });
    return list;
  }

  async getAll(userId: number, search?: string): Promise<List[]> {
    const availableToUserFilter: Prisma.ListWhereInput = {
      OR: [{ userId }, { listPermission: { some: { userId, permissions: { has: 'READ' } } } }],
    };

    const searchFilter: Prisma.ListWhereInput = {
      tasks: { some: { name: { mode: 'insensitive', contains: search } } },
    };

    const where = {
      ...availableToUserFilter,
      ...(search ? searchFilter : {}),
    };

    const lists = await db.list.findMany({ where });
    return lists;
  }
}
