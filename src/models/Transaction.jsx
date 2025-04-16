import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);