// src/constants/categories.js

export const CATEGORIES = [
  { label: 'Food',           emoji: '🍕' },
  { label: 'Transport',      emoji: '🚕' },
  { label: 'Utilities',      emoji: '💡' },
  { label: 'Health',         emoji: '💊' },
  { label: 'Entertainment',  emoji: '🎮' },
  { label: 'Shopping',       emoji: '🛍️' },
  { label: 'Education',      emoji: '📚' },
  { label: 'Other',          emoji: '📦' },
];

export const CATEGORY_LABELS = CATEGORIES.map(c => c.label);