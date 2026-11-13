import type { BusinessConfig } from '@altrimar/shared';

export function BrandHeader({ business }: { business: BusinessConfig }) {
  return <header className="brand-header"><img src={business.identity.logoPath} alt={`Logotipo de ${business.identity.name}`} /><div><p>{business.identity.name}</p><span>{business.identity.tagline}</span></div></header>;
}
