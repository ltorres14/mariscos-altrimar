import { useState } from "react";
import type { BusinessConfig } from "@altrimar/shared";

export function MenuViewer({ business }: { business: BusinessConfig }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="menu-card"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú en tamaño completo"
      >
        <img
          src={business.temporaryMenu.imagePath}
          alt="Menú vigente de Mariscos ALTRIMAR"
        />
        <span>{business.temporaryMenu.updatedLabel}</span>
        <b>Ampliar menú</b>
      </button>
      {open && (
        <div
          className="menu-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Menú vigente"
        >
          <button
            className="close-button"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cerrar
          </button>
          <img
            src={business.temporaryMenu.imagePath}
            alt="Menú vigente de Mariscos ALTRIMAR"
          />
        </div>
      )}
    </>
  );
}
