/**
 * Utility functions for date formatting.
 */

/**
 * Returns a readable date string (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns a simple numeric date (e.g., "01/15/2024")
 */
export const formatNumericDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US');
};
