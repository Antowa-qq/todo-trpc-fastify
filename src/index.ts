import fastify from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { context } from './trpc/context';
import { appRouter } from './trpc/router';
import { connectDB } from './utils/prisma';

const PORT = 6001;
const PREFIX = '/trpc';

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: PREFIX,
  trpcOptions: { router: appRouter, createContext: context },
});

const start = async () => {
  try {
    server.listen({ port: PORT, host: '0.0.0.0' });
    await connectDB();
    console.log(`=================================`);
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 API is running on ${PORT} port`);
    console.log(`=================================`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
