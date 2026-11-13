# Continuidad con Lovable

El frontend es React + TypeScript + Vite y está deliberadamente aislado en `apps/web`. Los componentes que deben conservarse son `BrandHeader`, `MenuViewer` y la capa `lib/business.ts`; sus tokens se reciben de `config/business.json` (`#12468A`, `#FF631C`, `#F8F4E9`). No modificar contratos de `packages/shared`, rutas `/api/public/*` ni rutas de los recursos sin coordinar la API.

Lovable permite crear proyectos desde ChatGPT, importar código mediante ZIP y conectar Git en ajustes del proyecto; no se debe asumir una importación bidireccional automática de este monorepo existente. Estrategia: usar este repositorio como fuente de verdad, llevar solamente `apps/web` y los tokens/contratos necesarios a un proyecto Lovable, y devolver cambios revisados como PR o parche. No sustituir Fastify, Docker, SQLite/Prisma ni el modelo de seguridad por el backend administrado sin una migración explícita.

Referencias oficiales: [importación de proyectos](https://docs.lovable.dev/features/projects/import-project.md), [ajustes y Git](https://docs.lovable.dev/features/projects/settings.md), [app de ChatGPT](https://docs.lovable.dev/tips-tricks/chatgpt-app.md).
