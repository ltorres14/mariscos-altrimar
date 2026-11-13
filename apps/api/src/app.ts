import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import { orderInputSchema, type BusinessConfig } from '@altrimar/shared';
import type { Env } from './config/env.js';
import { OrderService } from './modules/orders/order-service.js';
import { projectRoot } from './config/project-root.js';

export async function buildApp(env: Env, business: BusinessConfig, orders = new OrderService()) {
  const app = Fastify({ logger: env.NODE_ENV !== 'test', bodyLimit: 100_000 });
  await app.register(cors, { origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()), methods: ['GET', 'POST'] });
  const assetsDir = resolve(projectRoot, 'assets');
  if (existsSync(assetsDir)) await app.register(fastifyStatic, { root: assetsDir, prefix: '/assets/', decorateReply: false });

  app.get('/api/health', async () => ({ status: 'ok', service: 'altrimar-api' }));
  app.get('/api/public/config', async () => business);
  app.get('/api/public/categories', async () => ({ categories: [] }));
  app.get('/api/public/products', async () => ({ products: [] }));
  app.post('/api/public/orders', async (request, reply) => {
    const parsed = orderInputSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'VALIDATION_ERROR', message: 'El pedido contiene datos inválidos.', details: parsed.error.flatten() });
    if (!business.ordering.enabled) return reply.code(503).send({ error: 'ORDERING_DISABLED', message: 'Los pedidos digitales aún no están habilitados.' });
    return reply.code(201).send(await orders.create(parsed.data));
  });

  const webDir = env.WEB_DIST_DIR && resolve(projectRoot, env.WEB_DIST_DIR);
  if (webDir && existsSync(webDir)) {
    await app.register(fastifyStatic, { root: webDir, prefix: '/', wildcard: false });
    app.get('/*', async (_request, reply) => reply.sendFile('index.html'));
  }
  return app;
}
