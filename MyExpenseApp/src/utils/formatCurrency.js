/**
 * Formats a number as a currency string.
 * Centralizing this ensures consistent formatting (e.g., $1,234.56) across the app.
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
};
