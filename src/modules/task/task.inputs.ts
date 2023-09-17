import { TypeOf, object, string, number } from 'zod';

export const createTaskSchema = object({
  name: string({ required_error: 'Task name is required' }).max(50),
  listId: number({ required_error: 'List id is required' }),
});

export const updateTaskSchema = object({
  id: number({ required_error: 'Task id is required' }),
  listId: number({ required_error: 'List id is required' }),
  name: string({ required_error: 'Task name is required' }).max(50),
});

export const deleteTaskSchema = object({
  id: number({ required_error: 'Task id is required' }),
  listId: number({ required_error: 'List id is required' }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>;

