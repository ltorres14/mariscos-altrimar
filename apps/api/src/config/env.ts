import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3083),
  API_HOST: z.string().default('127.0.0.1'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  WEB_DIST_DIR: z.string().optional(),
});
export type Env = z.infer<typeof envSchema>;
export const loadEnv = (source = process.env): Env => envSchema.parse(source);
