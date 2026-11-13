import { z } from 'zod';

export const businessConfigSchema = z.object({
  identity: z.object({ name: z.string().min(1), tagline: z.string().min(1), logoPath: z.string().startsWith('/') }),
  contact: z.object({ whatsApp: z.string().regex(/^\d{10,15}$/), hours: z.string().min(1) }),
  ordering: z.object({ enabled: z.boolean(), whatsAppMessage: z.string().min(1) }),
  theme: z.object({ primary: z.string().regex(/^#[0-9a-fA-F]{6}$/), accent: z.string().regex(/^#[0-9a-fA-F]{6}$/), surface: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  temporaryMenu: z.object({ imagePath: z.string().startsWith('/'), updatedLabel: z.string().min(1) }),
});

export const catalogOptionSchema = z.object({ id: z.string(), name: z.string().min(1), priceCents: z.number().int().nonnegative() });
export const productSchema = z.object({
  id: z.string(), categoryId: z.string(), name: z.string().min(1), description: z.string().optional(),
  priceCents: z.number().int().nonnegative(), imagePath: z.string().optional(), available: z.boolean(),
  variants: z.array(catalogOptionSchema).default([]), extras: z.array(catalogOptionSchema).default([]),
});
export const orderInputSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  customerPhone: z.string().trim().regex(/^\+?[0-9\s-]{10,20}$/),
  notes: z.string().trim().max(500).optional(),
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(20), variantId: z.string().optional(), extraIds: z.array(z.string()).max(10).default([]) })).min(1).max(30),
});

export type BusinessConfig = z.infer<typeof businessConfigSchema>;
export type CatalogProduct = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderInputSchema>;
