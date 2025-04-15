'use client';
import { useState, useEffect } from 'react';
import AddTransaction from '@/components/AddTransaction';
import MonthlyChart from '@/components/MonthlyChart';
import TransactionList from '@/components/TransactionList';

const BEEP_SOUND_URL = 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [highlightMonth, setHighlightMonth] = useState(null);

  const beepAudio = typeof Audio !== 'undefined' ? new Audio(BEEP_SOUND_URL) : null;

  useEffect(() => {
    fetchTransactions();
    return () => {
      if (beepAudio) {
        beepAudio.pause();
      }
    };
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/transactions');
      if (!res.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAdded = async () => {
    await fetchTransactions();
    if (beepAudio) {
      beepAudio.currentTime = 0;
      beepAudio.play().catch((err) => console.warn('Beep failed:', err));
    }
  };

  const handleHighlightMonth = (monthStr) => {
    setHighlightMonth(monthStr);
  };

  // Get latest transaction
  const latestTransaction =
  transactions.length > 0 ? [transactions[transactions.length - 1]] : [];

  return (
    <main className="w-full h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* PAGE TITLE */}
      <div className="bg-white p-4 shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Personal Finance Visualizer
        </h1>
        <p className="text-sm text-gray-500">
          A simple web application for tracking personal finances.
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT MENU BUTTON */}
        <div className="bg-gray-800 text-white w-12 flex flex-col items-center p-2">
          <button
            className="p-2 hover:bg-gray-700 rounded"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            ☰
          </button>
        </div>

        {/* SIDEBAR OVERLAY */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg w-80 z-50 transform transition-transform duration-300 ${
            showOverlay ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl">Recent Transactions</h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-sm text-gray-600 px-2 py-1 border rounded hover:bg-gray-200"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {error && <p className="text-red-600">{error}</p>}
              {loading ? (
                <p>Loading transactions...</p>
              ) : (
                <TransactionList
                  transactions={transactions}
                  onTransactionClick={handleHighlightMonth}
                />
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 overflow-hidden">
            {/* LEFT 30% */}
            <div className="w-1/3 p-6 flex flex-col gap-4 overflow-y-auto">
              {/* Add Transaction */}
              <div className="bg-white rounded shadow p-6">
                <AddTransaction onTransactionAdded={handleTransactionAdded} />
              </div>

              {/* Latest Transaction */}
              <div className="bg-white rounded shadow p-4">
                <h3 className="font-semibold text-lg mb-2">Previous Transaction</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : latestTransaction.length > 0 ? (
                  <TransactionList
                    transactions={latestTransaction}
                    onTransactionClick={handleHighlightMonth}
                  />
                ) : (
                  <p className="text-gray-500 text-sm">No transactions yet.</p>
                )}
              </div>
            </div>

            {/* RIGHT 70% */}
            <div className="w-2/3 p-6">
              <div className="bg-white rounded shadow p-6 h-full flex flex-col">
                {error && <p className="text-red-600 mb-2">{error}</p>}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <MonthlyChart
                    transactions={transactions}
                    highlightMonth={highlightMonth}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
