import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

const business = {
  identity: {
    name: "ALTRIMAR",
    tagline: "Mariscos",
    logoPath: "/assets/logo.png",
  },
  contact: { whatsApp: "5218112154649", hours: "12 a 18" },
  ordering: { enabled: false, whatsAppMessage: "Hola" },
  theme: { primary: "#12468A", accent: "#FF631C", surface: "#F8F4E9" },
  temporaryMenu: { imagePath: "/assets/menu.png", updatedLabel: "Menú" },
};
test("expone la configuración pública y el estado de salud", async () => {
  const app = await buildApp(
    {
      NODE_ENV: "test",
      API_PORT: 3083,
      API_HOST: "127.0.0.1",
      CORS_ORIGIN: "http://localhost:5173",
    },
    business,
  );
  assert.equal((await app.inject("/api/health")).statusCode, 200);
  const response = await app.inject("/api/public/config");
  assert.equal(response.statusCode, 200);
  assert.equal(response.json().identity.name, "ALTRIMAR");
  await app.close();
});
