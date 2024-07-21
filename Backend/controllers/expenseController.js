const Expense = require("../models/Expense");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
  const { date, amount, category, description } = req.body;
  try {
    const expense = await Expense.create({
      user: req.user.id,
      date: new Date(),
      amount,
      category,
      description,
    });
    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.deleteExpenses = async (req, res) => {
  try {
    const { _id } = req.params;
    // console.log(_id);
    const isDelete = await Expense.deleteOne({ _id: _id, user: req.user.id });
    if (isDelete) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({
        success: false,
        message: "you are not authorized to delete or data not found",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
exports.updateExpenses = async (req, res) => {
  const { _id } = req.params;
  const updateData = req.body;
  try {
    const data = await Expense.findById(_id);
    console.log(req.user.id, data.user.toString());
    if (!data) {
      res.status(404).json({
        success: false,
        message: "Expense not found ",
      });
    } else if (req.user.id === data.user.toString()) {
      const isUpdated = await Expense.findByIdAndUpdate(
        _id,
        updateData,
        {
          new: true,
        } // Options (optional) - this option returns the updated document
      );

      // if (isUpdated) {
      res.status(200).json({ success: true, data: isUpdated });
      // } else {
      //   res.status(404).json({
      //     success: false,
      //     message: "Expense not found ",
      // });
      // }
    } else {
      res.status(404).json({
        success: false,
        message: "You are not authorized to do this change  ",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
