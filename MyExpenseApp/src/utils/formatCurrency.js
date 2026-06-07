/**
 * Formats a number as a currency string.
 * Centralizing this ensures consistent formatting across the app.
 * Adjusted to display "Rs" as requested.
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'Rs 0.00';
  
  // Using a custom string format for "Rs" to ensure cross-platform consistency
  const formattedValue = Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `Rs ${formattedValue}`;
};
