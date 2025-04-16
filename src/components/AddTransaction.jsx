'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const presetCategories = [
  'Food',
  'Rent',
  'Utilities',
  'Salary',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Investment',
  'Custom',
];

export default function AddTransaction({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [selectedPreset, setSelectedPreset] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const isCustom = selectedPreset === 'Custom';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error adding transaction.');
      }

      setMessage('Transaction added successfully!');
      setFormData({
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSelectedPreset('');

      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block mb-1">Amount</Label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="w-full"
            step="0.01"
          />
        </div>
        <div>
          <Label className="block mb-1">Description</Label>
          <Input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="w-full"
          />
        </div>

        <div>
          <Label className="block mb-1">Category</Label>
          <select
            value={selectedPreset}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedPreset(value);
              setFormData({
                ...formData,
                category: value === 'Custom' ? '' : value,
              });
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select a Category --</option>
            {presetCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {isCustom && (
            <Input
              placeholder="Enter custom category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mt-2"
              required
            />
          )}
        </div>

        <div>
          <Label className="block mb-1">Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </Button>

        {message && (
          <p
            className={`mt-2 ${
              message.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
