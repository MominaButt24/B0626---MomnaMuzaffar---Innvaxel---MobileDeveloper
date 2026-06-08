export const CATEGORIES = [
  { label: 'Food',           icon: 'fast-food-outline',     color: '#FF8A80' }, // Pinkish/Red
  { label: 'Transport',      icon: 'car-outline',           color: '#81D4FA' }, // Blue
  { label: 'Utilities',      icon: 'flash-outline',         color: '#FFD54F' }, // Amber
  { label: 'Health',         icon: 'medical-outline',       color: '#81C784' }, // Green
  { label: 'Entertainment',  icon: 'game-controller-outline', color: '#BA68C8' }, // Purple
  { label: 'Shopping',       icon: 'cart-outline',          color: '#F06292' }, // Rose
  { label: 'Education',      icon: 'book-outline',          color: '#7986CB' }, // Indigo
  { label: 'Other',          icon: 'grid-outline',          color: '#A1887F' }, // Brown
];

export const CATEGORY_LABELS = CATEGORIES.map(c => c.label);
