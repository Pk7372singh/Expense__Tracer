const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
