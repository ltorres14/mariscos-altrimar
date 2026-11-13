import { readFile } from 'node:fs/promises';
import { businessConfigSchema, type BusinessConfig } from '@altrimar/shared';
import { resolve } from 'node:path';
import { projectRoot } from './project-root.js';

export async function loadBusinessConfig(path = resolve(projectRoot, 'config/business.json')): Promise<BusinessConfig> {
  return businessConfigSchema.parse(JSON.parse(await readFile(path, 'utf8')));
}
