export type PhotoCategory = 'real-estate' | 'portraits' | 'weddings' | 'events-sports'

export interface Photo {
  id: string
  src: string
  alt: string
  category: PhotoCategory
  width: number
  height: number
}

export const categoryLabels: Record<PhotoCategory, string> = {
  'real-estate': 'Real Estate',
  portraits: 'Portraits',
  weddings: 'Weddings',
  'events-sports': 'Events & Sports',
}

// Placeholder photos — replace with real images
export const photos: Photo[] = [
  // Real Estate
  { id: 're-1', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Modern house exterior', category: 'real-estate', width: 4, height: 3 },
  { id: 're-2', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Luxury living room', category: 'real-estate', width: 4, height: 3 },
  { id: 're-3', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Villa with pool', category: 'real-estate', width: 4, height: 3 },
  { id: 're-4', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Modern kitchen', category: 'real-estate', width: 4, height: 3 },
  // Portraits
  { id: 'pt-1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'Portrait session', category: 'portraits', width: 3, height: 4 },
  { id: 'pt-2', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Creative portrait', category: 'portraits', width: 3, height: 4 },
  { id: 'pt-3', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', alt: 'Fashion portrait', category: 'portraits', width: 3, height: 4 },
  { id: 'pt-4', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Artistic portrait', category: 'portraits', width: 3, height: 4 },
  // Weddings
  { id: 'wd-1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Wedding ceremony', category: 'weddings', width: 4, height: 3 },
  { id: 'wd-2', src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', alt: 'Wedding details', category: 'weddings', width: 3, height: 4 },
  { id: 'wd-3', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'Wedding dance', category: 'weddings', width: 4, height: 3 },
  { id: 'wd-4', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Wedding couple', category: 'weddings', width: 4, height: 3 },
  // Events & Sports
  { id: 'ev-1', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Event photography', category: 'events-sports', width: 4, height: 3 },
  { id: 'ev-2', src: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&q=80', alt: 'Sports action shot', category: 'events-sports', width: 4, height: 3 },
  { id: 'ev-3', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Concert photography', category: 'events-sports', width: 4, height: 3 },
  { id: 'ev-4', src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', alt: 'Corporate event', category: 'events-sports', width: 4, height: 3 },
]
