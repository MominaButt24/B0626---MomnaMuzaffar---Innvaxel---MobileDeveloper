/**
 * Utility to calculate spending totals by category.
 */
export const calculateCategoryTotals = (expenses, categories) => {
  const totals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  return Object.entries(totals).map(([label, amount]) => {
    const categoryInfo = categories.find(c => c.label === label) || {};
    return {
      category: label,
      amount,
      color: categoryInfo.color || '#94A3B8',
    };
  }).sort((a, b) => b.amount - a.amount);
};
