import { TypeOf, object, string, number } from 'zod';

export const createListSchema = object({
  name: string({ required_error: 'List name is required' }).max(50),
});

export const updateListSchema = object({
  id: number({ required_error: 'List id is required' }),
  name: string({ required_error: 'List name is required' }).max(50),
});

export const deleteListSchema = object({
  id: number({ required_error: 'List id is required' }),
});

export const getAllListSchema = object({
  search: string().optional(),
}).optional();

export type CreateListInput = TypeOf<typeof createListSchema>;
export type UpdateListInput = TypeOf<typeof updateListSchema>;
export type DeleteListInput = TypeOf<typeof deleteListSchema>;
export type GetAllListInput = TypeOf<typeof getAllListSchema>;
