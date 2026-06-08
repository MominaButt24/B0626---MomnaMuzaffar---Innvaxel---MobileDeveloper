/**
 * formatCurrency.js
 * 
 * Money is the most important part of this app, so we need it to look 
 * consistent everywhere. This helper adds the 'Rs' prefix and ensures 
 * we always show exactly two decimal places (like 5.00 instead of 5).
 * 
 * By centralizing this, if we ever want to change the currency symbol, 
 * we only have to do it in this one file.
 */

export const formatCurrency = (value) => {
  // If for some reason the data is missing, we show a safe default
  if (value === undefined || value === null) return 'Rs 0.00';

  // toLocaleString adds those nice commas for thousands (e.g., 1,000.00)
  const formattedValue = Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `Rs ${formattedValue}`;
};
