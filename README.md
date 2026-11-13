# Mariscos ALTRIMAR

Menú digital público para Mariscos ALTRIMAR. Esta primera fase publica el menú temporal, conserva los recursos originales y deja contratos y persistencia listos para el catálogo y pedidos futuros.

## Inicio rápido

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

El sitio se abre en `http://localhost:5173` y la API en `http://127.0.0.1:3083`. Copie `.env.example` a `.env` para cambiar la configuración local.

## Comandos

`npm run build`, `npm run typecheck`, `npm run lint`, `npm run test` y `npm run validate` se ejecutan desde la raíz. `npm run db:generate` genera el cliente Prisma cuando se habilite la capa SQLite.

## Estado

Está implementada la página temporal, configuración pública centralizada, API de salud/configuración, contratos de catálogo y pedido, esquema Prisma, pruebas básicas, bot inactivo y Docker. Aún están pendientes el catálogo real autorizado, administración autenticada, repositorios Prisma activos, carrito/checkout público y la integración WhatsApp.

Consulta [arquitectura](docs/ARQUITECTURA.md), [Lovable](docs/LOVABLE.md) y [despliegue](docs/DESPLIEGUE.md).
