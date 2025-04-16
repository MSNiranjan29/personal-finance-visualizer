'use client';
import { useMemo } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E74C3C'];

export default function CategoryPieChart({ transactions = [] }) {
  const data = useMemo(() => {
    const groups = {};
    transactions.forEach((tx) => {
      const cat = tx.category || 'Uncategorized';
      groups[cat] = (groups[cat] || 0) + Math.abs(tx.amount);
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
