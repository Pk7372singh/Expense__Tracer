import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Form data being sent:", formData);
      const { data } = await signUp(formData);
      console.log("Response data:", data);
      localStorage.setItem("profile", JSON.stringify(data));
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      console.log(error.response.data.error);
      setError(
        `Signup failed. Please try again. ${[error.response.data.error]}`
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
