export interface PortfolioCategory {
  id: string
  labelKey: string
  slug: string
  photos: string[]
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'inmuebles',
    labelKey: 'catInmuebles',
    slug: 'inmuebles',
    photos: [],
  },
  {
    id: 'club-porsche',
    labelKey: 'catClubPorsche',
    slug: 'club-porsche',
    photos: [],
  },
  {
    id: 'eventos',
    labelKey: 'catEventos',
    slug: 'eventos',
    photos: [],
  },
  {
    id: 'deportes',
    labelKey: 'catDeportes',
    slug: 'deportes',
    photos: Array.from({ length: 12 }, (_, i) => `/images/portfolio/deportes/IMG_${String(858 + i).padStart(4, '0')}.JPG`),
  },
  {
    id: 'bodas',
    labelKey: 'catBodas',
    slug: 'bodas',
    photos: [
      '/images/portfolio/bodas/JoseMaría_María-1.jpg',
      '/images/portfolio/bodas/JoseMaría_María-2.jpg',
      '/images/portfolio/bodas/JoseMaría_María-3.jpg',
      '/images/portfolio/bodas/JoseMaría_María-4.jpg',
      '/images/portfolio/bodas/JoseMaría_María-5.jpg',
      '/images/portfolio/bodas/JoseMaría_María-10.jpg',
      '/images/portfolio/bodas/JoseMaría_María-11.jpg',
      '/images/portfolio/bodas/JoseMaría_María-12.jpg',
      '/images/portfolio/bodas/JoseMaría_María-16.jpg',
      '/images/portfolio/bodas/JoseMaría_María-17.jpg',
      '/images/portfolio/bodas/JoseMaría_María-20.jpg',
      '/images/portfolio/bodas/JoseMaría_María-21.jpg',
    ],
  },
  {
    id: 'retrato',
    labelKey: 'catRetrato',
    slug: 'retrato',
    photos: [],
  },
  {
    id: 'noche',
    labelKey: 'catNoche',
    slug: 'noche',
    photos: [],
  },
  {
    id: 'coches',
    labelKey: 'catCoches',
    slug: 'coches',
    photos: [],
  },
]
