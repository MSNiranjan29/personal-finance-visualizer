'use client';
import { useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Save, X } from 'lucide-react';

export default function TransactionList({
  transactions = [],
  onTransactionClick,
  onTransactionUpdated,
  onTransactionDeleted
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: '', description: '', date: '' });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  const startEdit = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.split('T')[0],
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ amount: '', description: '', date: '' });
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/transactions?id=${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editForm,
        amount: parseFloat(editForm.amount)
      }),
    });

    if (res.ok) {
      onTransactionUpdated?.();
      cancelEdit();
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/transactions?id=${selectedToDelete}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      onTransactionDeleted?.();
    }
    setShowDeleteModal(false);
    setSelectedToDelete(null);
  };

  const openDeleteModal = (id) => {
    setSelectedToDelete(id);
    setShowDeleteModal(true);
  };

  const handleClick = (transaction) => {
    if (!onTransactionClick) return;
    const monthStr = format(parseISO(transaction.date), 'MMM');
    onTransactionClick(monthStr);
  };

  return (
    <>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex justify-between items-center border p-4 rounded bg-white shadow-sm hover:bg-gray-50 transition min-w-[340px]"
            >
              {editingId === transaction._id ? (
                <div className="flex flex-col w-full gap-2">
                  <Input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                  />
                  <Input
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />
                  <Input
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                  />
                  <div className="flex gap-2 self-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleUpdate}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={cancelEdit}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => handleClick(transaction)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <p className="font-medium truncate">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>

                  <p
                    className={`font-medium whitespace-nowrap mx-4 ${
                      transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    ₹{transaction.amount.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(transaction)}
                    >
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteModal(transaction._id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
