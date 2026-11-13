import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Works both from src/ during tsx development and from dist/ in the container.
export const projectRoot = resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
