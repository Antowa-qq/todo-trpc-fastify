import fastify from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { context } from './trpc/context';
import { appRouter } from './trpc/router';

const PORT = 3000;
const PREFIX = '/trpc';

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: PREFIX,
  trpcOptions: { router: appRouter, createContext: context },
});

try {
  server.listen({ port: PORT });
  console.log(`🚀 API is running on: http://localhost:${PORT}${PREFIX}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
