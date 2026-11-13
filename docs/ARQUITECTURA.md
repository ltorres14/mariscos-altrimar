# Arquitectura

ALTRIMAR usa npm workspaces: `apps/web` es la experiencia pública React/Vite, `apps/api` publica contratos Fastify y los recursos existentes, `apps/bot` reserva puertos de integración sin iniciar WhatsApp, y `packages/shared` mantiene esquemas Zod y tipos de dominio.

La página actual consume `GET /api/public/config` y conserva un valor local seguro para poder mostrar el menú temporal si el API está apagada. `config/business.json` contiene identidad y operación pública; los secretos pertenecen a variables de entorno. `assets/` sigue siendo la fuente de recursos y Fastify la expone de solo lectura en `/assets/`.

El esquema Prisma y su migración inicial modelan categorías, productos, variantes, extras y pedidos. Aún no se conecta como repositorio activo porque no hay catálogo ni precios autorizados; los pedidos se validan y se rechazan explícitamente mientras `ordering.enabled` sea `false`.

Patrones tomados de los proyectos auditados: workspaces y contratos compartidos (GAESTRA), módulos API y validación (El Naranjo), y separación de catálogo/pedido/variantes (Buki's). Se evita importar código o dependencias de POS, pagos, sesiones y bot antes de necesitarlos.
