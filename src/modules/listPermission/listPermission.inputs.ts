import { TypeOf, object, nativeEnum, number } from 'zod';
import { ListPermissionEnum } from '@prisma/client';

export const upsertListPermissionSchema = object({
  targetUserId: number({ required_error: 'Target user id is required' }),
  listId: number({ required_error: 'List id is required' }),
  permissions: nativeEnum(ListPermissionEnum).array(),
});

export type UpsertListPermissionInput = TypeOf<typeof upsertListPermissionSchema>;
