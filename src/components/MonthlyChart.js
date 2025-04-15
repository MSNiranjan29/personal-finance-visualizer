'use client';
import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';

export default function MonthlyChart({ transactions = [], highlightMonth }) {
  const [dailyOverlay, setDailyOverlay] = useState({
    show: false,
    month: null,
    posX: 0
  });

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  const handleBarClick = (barData) => {
    if (
      barData &&
      barData.activePayload &&
      barData.activePayload.length > 0 &&
      barData.activeCoordinate
    ) {
      setDailyOverlay({
        show: true,
        month: barData.activeLabel,
        posX: barData.activeCoordinate.x
      });
    }
  };

  const handleCloseOverlay = () => {
    setDailyOverlay({
      show: false,
      month: null,
      posX: 0
    });
  };

  const CustomBar = (props) => {
    const { x, y, width, height, fill, payload } = props;
    const isHighlighted = highlightMonth && payload.name === highlightMonth;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isHighlighted ? '#ef4444' : fill}
      />
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Monthly Expenses</h2>
        {dailyOverlay.show && (
          <button
            onClick={handleCloseOverlay}
            className="text-sm text-blue-500 flex items-center"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="flex-1">
        {monthlyData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} onClick={handleBarClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                name="Expenses"
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {dailyOverlay.show && (
        <div
          style={{ left: dailyOverlay.posX - 120 }}
          className="absolute top-12 w-64 bg-white shadow-lg border p-2 rounded z-10"
        >
          <h3 className="text-sm font-semibold mb-2">
            Daily Expenses for {dailyOverlay.month}
          </h3>
          {getDailyData(transactions, dailyOverlay.month).length === 0 ? (
            <p className="text-gray-500 text-xs">No data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={getDailyData(transactions, dailyOverlay.month)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#4a5568" />
                <YAxis stroke="#4a5568" />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" name="Daily Expenses" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
}

// Monthly aggregation
function getMonthlyData(transactions) {
  const monthlyTotals = {};

  for (const tx of transactions) {
    const date = parseISO(tx.date);
    const monthStr = format(date, 'MMM');
    monthlyTotals[monthStr] = (monthlyTotals[monthStr] || 0) + Math.abs(tx.amount);
  }

  return Object.entries(monthlyTotals).map(([name, amount]) => ({
    name,
    amount: parseFloat(amount.toFixed(2))
  }));
}

// Daily aggregation within a month
function getDailyData(transactions, monthLabel) {
  if (!monthLabel) return [];

  const monthIndex = new Date(`${monthLabel} 1, 2000`).getMonth();
  const dailyTotals = {};

  for (const tx of transactions) {
    const date = parseISO(tx.date);
    if (date.getMonth() === monthIndex) {
      const dayStr = format(date, 'MMM d');
      dailyTotals[dayStr] = (dailyTotals[dayStr] || 0) + Math.abs(tx.amount);
    }
  }

  return Object.entries(dailyTotals).map(([name, amount]) => ({
    name,
    amount: parseFloat(amount.toFixed(2))
  }));
}
