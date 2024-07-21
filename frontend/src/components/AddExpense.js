import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../api";

const AddExpense = ({ onAdd }) => {
  const [expenseData, setExpenseData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await addExpense(expenseData, token);
        // onAdd(data);
        console.log(data);
        setExpenseData({
          date: new Date().toISOString().split("T")[0],
          category: "",
          description: "",
          amount: "",
        });
        alert("Expenses add Sucessfully");
      }
    } catch (error) {
      console.error("Add expense error:", error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={expenseData.date}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={expenseData.category}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={expenseData.description}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          value={expenseData.amount}
        />
        <button type="submit">Add Expense</button>
      </form>
      <button onClick={() => navigate("/expenses")}>Go to Expense List</button>
    </div>
  );
};

export default AddExpense;
