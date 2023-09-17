import { router } from '@/trpc/index';
import { publicProcedure } from '@/trpc/procedure';

const healthCheckRouter = router({
  do: publicProcedure.query(() => 'TODO API OK'),
});

export default healthCheckRouter;
