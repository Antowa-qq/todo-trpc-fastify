import { ContextWithUser } from '@/trpc/context';

import { CreateListInput, UpdateListInput, DeleteListInput, GetAllListInput } from './list.inputs';
import { ListService } from './list.service';

export class ListController {
  private listService = new ListService();

  create(input: CreateListInput, ctx: ContextWithUser) {
    const userId = ctx.user.userId;

    const data = { ...input, userId };

    return this.listService.create(data);
  }

  update(input: UpdateListInput, ctx: ContextWithUser) {
    const userId = ctx.user.userId;

    const { id, name } = input;

    return this.listService.update(id, userId, { name });
  }

  delete(input: DeleteListInput, ctx: ContextWithUser) {
    const userId = ctx.user.userId;

    const { id } = input;

    return this.listService.delete(id, userId);
  }

  getAll(input: GetAllListInput, ctx: ContextWithUser) {
    const userId = ctx.user.userId;
    const search = input?.search;
    return this.listService.getAll(userId, search);
  }
}
