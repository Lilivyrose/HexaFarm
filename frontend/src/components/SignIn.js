import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/SignIn.css";

function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    console.log("SignIn.jsx: Handling login...");
    setError(""); // Clear previous errors

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log("SignIn.jsx: Supabase response:", user, error);

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", user.id); // Use user.id as the token
      setUser(user); // Update user state in App.js
      console.log("SignIn.jsx: Redirecting to /dashboard...");
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}> {/* Wrap inputs in a form */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link> {/* Use Link */}
      </p>
    </div>
  );
}

export default SignIn;