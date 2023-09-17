import { isAuthorized } from '@/modules/auth/auth.middleware';
import { procedure } from './index';

export const publicProcedure = procedure;
export const isAuthorizedProcedure = procedure.use(isAuthorized);
