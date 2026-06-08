/**
 * formats a number as a currency string
 * centrlizing this ensures consistent formatting across the app
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'Rs 0.00';

  const formattedValue = Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `Rs ${formattedValue}`;
};
