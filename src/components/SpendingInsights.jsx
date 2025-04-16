'use client';
import { useMemo } from 'react';

export default function SpendingInsights({ transactions = [] }) {
  const totalExpense = useMemo(() => {
    return transactions.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  }, [transactions]);

  let insight = 'Keep it up! Your spending seems under control.';
  if (totalExpense > 50000) {
    insight = 'Alert: Your spending is high this month. Consider reviewing your expenses.';
  } else if (totalExpense > 20000) {
    insight = 'Notice: You are getting close to your budget. Monitor your spending.';
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Spending Insights</h2>
      <p className="text-sm text-gray-600">{insight}</p>
    </div>
  );
}

