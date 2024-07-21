// import React, { useEffect, useState } from "react";
// import { fetchExpenses, deleteExpense } from "../api"; // Import the deleteExpense function

// const ExpenseList = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getExpenses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           // const user = JSON.parse(atob(token.split(".")[1]));
//           // const userId = user.id;

//           const { data } = await fetchExpenses(token);
//           // console.log(data);
//           setExpenses(data.expenses);
//         }
//       } catch (error) {
//         console.error("Fetch expenses error:", error);
//         setError("Failed to fetch expenses. Please try again.");
//       }
//     };

//     getExpenses();
//   }, []);

//   const handleDelete = async (expenseId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await deleteExpense(expenseId, token);
//         setExpenses(expenses.filter((expense) => expense._id !== expenseId));
//       }
//     } catch (error) {
//       console.error("Delete expense error:", error);
//       setError("Failed to delete expense. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Expense List</h2>
//       {error && <p>{error}</p>}
//       {expenses.length > 0 ? (
//         <ul>
//           {expenses.map((expense) => (
//             <li key={expense._id}>
//               <strong>Date:</strong>{" "}
//               {new Date(expense.date).toLocaleDateString()}
//               <br />
//               <strong>Category:</strong> {expense.category}
//               <br />
//               <strong>Description:</strong> {expense.description}
//               <br />
//               <strong>Amount:</strong> ${expense.amount}
//               <br />
//               <button onClick={() => handleDelete(expense._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//     </div>
//   );
// };

// export default ExpenseList;

// with update functionalities

import React, { useEffect, useState } from "react";
import { fetchExpenses, deleteExpense, updateExpense } from "../api";
import { useNavigate } from "react-router-dom";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await fetchExpenses(token);
          setExpenses(data.expenses);
        }
      } catch (error) {
        console.error("Fetch expenses error:", error);
        setError("Failed to fetch expenses. Please try again.");
      }
    };

    getExpenses();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await deleteExpense(expenseId, token);
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      }
    } catch (error) {
      console.error("Delete expense error:", error);
      setError("Failed to delete expense. Please try again.");
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await updateExpense(editMode, editFormData, token);
        setExpenses(
          expenses.map((expense) =>
            expense._id === editMode ? { ...expense, ...editFormData } : expense
          )
        );
        setEditMode(null);
      }
    } catch (error) {
      console.error("Update expense error:", error);
      setError("Failed to update expense. Please try again.");
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      {error && <p>{error}</p>}
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {editMode === expense._id ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditChange}
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={editFormData.amount}
                    onChange={handleEditChange}
                    placeholder="Amount"
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <strong>Date:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString()}
                  <br />
                  <strong>Category:</strong> {expense.category}
                  <br />
                  <strong>Description:</strong> {expense.description}
                  <br />
                  <strong>Amount:</strong> ${expense.amount}
                  <br />
                  <div>
                    <button onClick={() => handleDelete(expense._id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(expense._id);
                        setEditFormData({
                          date: new Date(expense.date)
                            .toISOString()
                            .split("T")[0],
                          category: expense.category,
                          description: expense.description,
                          amount: expense.amount,
                        });
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
      <button onClick={() => navigate("/add-expense")}>Add expenses</button>
    </div>
  );
};

export default ExpenseList;
