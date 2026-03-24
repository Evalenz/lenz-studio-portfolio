export type DesignCategory = 'posters' | 'flyers' | 'web' | 'apps'

export interface DesignProject {
  id: string
  title: string
  description: string
  category: DesignCategory
  image: string
}

export const designCategoryLabels: Record<DesignCategory, string> = {
  posters: 'Posters',
  flyers: 'Flyers',
  web: 'Web Design',
  apps: 'Apps',
}

// Placeholder projects — replace with real work
export const designProjects: DesignProject[] = [
  {
    id: 'd-1',
    title: 'Brand Campaign Poster',
    description: 'Visual identity and poster design for a creative campaign.',
    category: 'posters',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: 'd-2',
    title: 'Event Flyer Design',
    description: 'Eye-catching flyer for a music event with bold typography.',
    category: 'flyers',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  },
  {
    id: 'd-3',
    title: 'E-Commerce Website',
    description: 'Full responsive web design for a fashion brand.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
  },
  {
    id: 'd-4',
    title: 'Fitness App UI',
    description: 'Mobile app interface design with intuitive user experience.',
    category: 'apps',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    id: 'd-5',
    title: 'Festival Poster Series',
    description: 'Series of typographic posters for a cultural festival.',
    category: 'posters',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80',
  },
  {
    id: 'd-6',
    title: 'Restaurant Landing Page',
    description: 'Elegant one-page website for a high-end restaurant.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
]
