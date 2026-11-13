import { useEffect, useState } from "react";
import type { BusinessConfig } from "@altrimar/shared";
import { BrandHeader } from "./components/BrandHeader";
import { MenuViewer } from "./components/MenuViewer";
import { fallbackBusiness, whatsAppUrl } from "./lib/business";

export function App() {
  const [business, setBusiness] = useState<BusinessConfig>(fallbackBusiness);
  useEffect(() => {
    fetch("/api/public/config")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setBusiness)
      .catch(() => undefined);
  }, []);
  return (
    <div
      className="app"
      style={
        {
          "--primary": business.theme.primary,
          "--accent": business.theme.accent,
          "--surface": business.theme.surface,
        } as React.CSSProperties
      }
    >
      <BrandHeader business={business} />
      <main>
        <section className="intro">
          <p className="eyebrow">Menú digital</p>
          <h1>El sabor del Pacífico, directo a tu mesa.</h1>
          <p>Consulta nuestro menú vigente y escríbenos para atenderte.</p>
          <a className="button button--accent" href="#menu">
            Ver menú
          </a>
        </section>
        <section
          id="menu"
          className="menu-section"
          aria-labelledby="menu-title"
        >
          <div>
            <p className="eyebrow">Disponible ahora</p>
            <h2 id="menu-title">Nuestro menú</h2>
          </div>
          <MenuViewer business={business} />
        </section>
        <section className="details">
          <div>
            <h2>Horario</h2>
            <p>{business.contact.hours}</p>
          </div>
          <a
            className="button button--outline"
            href={whatsAppUrl(business)}
            target="_blank"
            rel="noreferrer"
          >
            Pedir por WhatsApp
          </a>
        </section>
      </main>
      <footer>
        © {new Date().getFullYear()} {business.identity.name}
      </footer>
    </div>
  );
}
