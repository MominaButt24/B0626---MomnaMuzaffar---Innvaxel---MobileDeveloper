/**
 * calcSummary.js
 * 
 * This is where the heavy lifting for the "Statistics" screen happens. 
 * It takes a big list of individual expenses and boils them down 
 * into category totals so the pie chart can understand them.
 */

export const calculateCategoryTotals = (expenses, categories) => {
  // We use reduce to create an object where keys are categories and values are sums
  const totals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // We convert that object into an array and attach the right colors
  return Object.entries(totals).map(([label, amount]) => {
    const categoryInfo = categories.find(c => c.label === label) || {};
    return {
      category: label,
      amount,
      color: categoryInfo.color || '#94A3B8',
    };
  })
  // Sort them so the biggest spending always appears at the top
  .sort((a, b) => b.amount - a.amount);
};
