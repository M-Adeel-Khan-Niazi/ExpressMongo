const mongoose = require("mongoose");

const transactsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_code: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});
const transactionSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  transaction_count: {
    type: Number,
    required: true,
  },
  buket_start_date: {
    type: Date,
    required: true,
  },
  buket_end_date: {
    type: Date,
    required: true,
  },
  transactions: {
    type: [transactsSchema],
  },
});

const Transaction = mongoose.model("transactions", transactionSchema);
exports.Transaction = Transaction;
