/**
 * Punto de extensión deliberadamente inactivo. Un adaptador de whatsapp-web.js
 * deberá implementar MessageChannel y conservar credenciales fuera del repositorio.
 */
export interface MessageChannel { send(to: string, body: string): Promise<void> }
export interface MenuGateway { getMenuLink(): Promise<string> }

export function createWelcomeMessage(menuUrl: string) {
  return `¡Hola! Consulta el menú de Mariscos ALTRIMAR aquí: ${menuUrl}`;
}

if (process.env.START_BOT === 'true') {
  throw new Error('El adaptador de WhatsApp no está configurado. No se iniciará ninguna sesión en esta fase.');
}
