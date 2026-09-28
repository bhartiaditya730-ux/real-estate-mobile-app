export const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps-outline' },
  { id: 'house', label: 'House', icon: 'home-outline' },
  { id: 'apartment', label: 'Apartment', icon: 'business-outline' },
  { id: 'villa', label: 'Villa', icon: 'bed-outline' },
  { id: 'commercial', label: 'Commercial', icon: 'storefront-outline' },
  { id: 'land', label: 'Land', icon: 'map-outline' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
