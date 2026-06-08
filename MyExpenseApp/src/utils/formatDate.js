/**
 * formatDate.js
 * 
 * Date objects in JavaScript are notoriously messy to look at. 
 * These helpers turn those long timestamps into something 
 * a human can actually read.
 */

/**
 * Returns a readable date string like "Jan 15, 2024".
 * Used mainly in the expense list cards.
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
 * Returns a simple numeric date like "01/15/2024".
 * Used in the Date Picker field when adding an expense.
 */
export const formatNumericDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US');
};
