import { buildApp } from './app.js';
import { loadBusinessConfig } from './config/business-config.js';
import { loadEnv } from './config/env.js';

const env = loadEnv();
const app = await buildApp(env, await loadBusinessConfig());
await app.listen({ port: env.API_PORT, host: env.API_HOST });
