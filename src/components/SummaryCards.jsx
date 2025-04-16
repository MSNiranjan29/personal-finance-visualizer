'use client';
import { useMemo } from 'react';

export default function SummaryCards({ transactions = [] }) {
  const totalExpenses = useMemo(() => {
    return transactions.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    transactions.forEach((tx) => {
      const cat = tx.category || 'Uncategorized';
      breakdown[cat] = (breakdown[cat] || 0) + Math.abs(tx.amount);
    });
    return breakdown;
  }, [transactions]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Summary</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-xl font-bold">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="text-sm text-gray-600">Category Breakdown</p>
          {Object.entries(categoryBreakdown).map(([cat, amt]) => (
            <p key={cat} className="text-base">
              {cat}: ₹{amt.toFixed(2)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
