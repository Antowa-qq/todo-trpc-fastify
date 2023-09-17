import { Prisma, Task } from '@prisma/client';
import { db } from '@utils/prisma';

export class TaskService {
  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task = await db.task.create({ data });
    return task;
  }

  async update(id: number, data: Prisma.TaskUpdateInput) {
    const user = await db.task.update({ data, where: { id } });
    return user;
  }

  async delete(id: number) {
    const user = await db.task.delete({ where: { id } });
    return user;
  }
}
