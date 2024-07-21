import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
              {/* <a href={Signup}>Signup</a> */}
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/expenses">Expense List</Link>
            </li>
            <li>
              <Link to="/add-expense">Add Expense</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/expenses"
            element={<PrivateRoute component={ExpenseList} />}
          />
          <Route
            path="/add-expense"
            element={<PrivateRoute component={AddExpense} />}
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
