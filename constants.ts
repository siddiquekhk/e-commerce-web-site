
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aurelia Silk Scarf',
    description: 'Hand-woven Italian silk with intricate gold embroidery. A timeless accessory for any season.',
    price: 240,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.8,
    reviews: 124,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Midnight Velvet Blazer',
    description: 'Tailored fit midnight blue velvet blazer with silk lapels. Perfect for evening soirées.',
    price: 850,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68a?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    rating: 4.9,
    reviews: 56,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Carrara Marble Timepiece',
    description: 'Minimalist watch featuring a genuine Carrara marble face and leather strap.',
    price: 420,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.7,
    reviews: 89,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Opaline Glass Vase',
    description: 'Mouth-blown opaline glass vase with a subtle iridescent finish.',
    price: 310,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    rating: 4.5,
    reviews: 32
  },
  {
    id: '5',
    name: 'Cashmere Lounge Set',
    description: 'Ultra-soft Mongolian cashmere set including joggers and a relaxed hoodie.',
    price: 1200,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    stock: 20,
    rating: 5.0,
    reviews: 12,
    isNew: true
  },
  {
    id: '6',
    name: 'Santal & Cedar Candle',
    description: 'Hand-poured soy wax candle with notes of deep sandalwood and fresh cedarwood.',
    price: 65,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    rating: 4.6,
    reviews: 210
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Apparel', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Watches', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' },
];
