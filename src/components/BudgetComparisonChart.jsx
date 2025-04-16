'use client';
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function BudgetComparisonChart({ transactions = [] }) {
  // Dummy monthly budget for all categories, e.g. ₹10000 per month
  const monthlyBudget = 10000;
  
  const data = useMemo(() => {
    const monthlyExpenses = {};
    transactions.forEach((tx) => {
      const date = parseISO(tx.date);
      const monthStr = format(date, 'MMM');
      monthlyExpenses[monthStr] = (monthlyExpenses[monthStr] || 0) + Math.abs(tx.amount);
    });
    return Object.entries(monthlyExpenses).map(([name, amount]) => ({
      name,
      Actual: parseFloat(amount.toFixed(2)),
      Budget: monthlyBudget,
    }));
  }, [transactions, monthlyBudget]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#4a5568" />
        <YAxis stroke="#4a5568" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Budget" fill="#FFBB28" name="Budget" />
        <Bar dataKey="Actual" fill="#3b82f6" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
}
