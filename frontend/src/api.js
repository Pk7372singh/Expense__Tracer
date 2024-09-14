import axios from "axios";

const API = axios.create({
  baseURL: "http://16.170.245.103:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = (formData) => API.post("/api/auth/register", formData);
export const signIn = (formData) => API.post("/api/auth/login", formData);
export const addExpense = (expenseData, token) =>
  API.post("/api/expenses/addExpense", expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchExpenses = (token) =>
  API.get("/api/expenses/viewExpense", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteExpense = (expenseId, token) =>
  API.delete(`api/expenses/deleteExpense/${expenseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// function to update an expense by Id
export const updateExpense = (expenseId, updatedExpense, token) => {
  return API.patch(`/api/expenses/updateExpense/${expenseId}`, updatedExpense, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
