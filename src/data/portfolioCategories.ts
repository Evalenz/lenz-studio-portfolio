export interface PortfolioCategory {
  id: string
  labelKey: string
  slug: string
  folder: string
}

export const portfolioCategories: PortfolioCategory[] = [
  { id: 'inmuebles', labelKey: 'catInmuebles', slug: 'inmuebles', folder: 'inmuebles' },
  { id: 'club-porsche', labelKey: 'catClubPorsche', slug: 'club-porsche', folder: 'club-porsche' },
  { id: 'eventos', labelKey: 'catEventos', slug: 'eventos', folder: 'eventos' },
  { id: 'deportes', labelKey: 'catDeportes', slug: 'deportes', folder: 'deportes' },
  { id: 'bodas', labelKey: 'catBodas', slug: 'bodas', folder: 'bodas' },
  { id: 'retrato', labelKey: 'catRetrato', slug: 'retrato', folder: 'retrato' },
  { id: 'noche', labelKey: 'catNoche', slug: 'noche', folder: 'noche' },
  { id: 'coches', labelKey: 'catCoches', slug: 'coches', folder: 'coches' },
]
