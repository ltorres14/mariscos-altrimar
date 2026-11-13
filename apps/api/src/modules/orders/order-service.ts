import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { OrderInput } from '@altrimar/shared';
import { projectRoot } from '../../config/project-root.js';

export class OrderService {
  constructor(private readonly filePath = resolve(projectRoot, 'data/orders.ndjson')) {}

  async create(input: OrderInput) {
    const order = { id: crypto.randomUUID(), status: 'received' as const, createdAt: new Date().toISOString(), ...input };
    await mkdir(dirname(this.filePath), { recursive: true });
    await appendFile(this.filePath, `${JSON.stringify(order)}\n`, 'utf8');
    return { id: order.id, status: order.status, createdAt: order.createdAt };
  }
}
