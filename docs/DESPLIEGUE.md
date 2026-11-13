# Despliegue

El contenedor expone únicamente `127.0.0.1:3083`; Cloudflare Tunnel debe continuar apuntando a esa dirección. En el VPS, antes de arrancar, comprobar el puerto con `ss -ltnp | grep :3083`. Si está libre, copie `.env.example` a `.env`, ajuste los valores de producción y ejecute `docker compose up -d --build` desde la raíz. Verifique `curl http://127.0.0.1:3083/api/health` y la URL pública.

El volumen `./data:/app/data` conserva datos operativos. No se despliega el bot en esta fase.
