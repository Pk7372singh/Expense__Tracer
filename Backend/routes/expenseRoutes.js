const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpenses,
  updateExpenses,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addExpense", protect, addExpense);
router.get("/viewExpense", protect, getExpenses);
router.delete("/deleteExpense/:_id", protect, deleteExpenses);
router.patch("/updateExpense/:_id", protect, updateExpenses);
module.exports = router;
