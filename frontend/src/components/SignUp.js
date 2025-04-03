import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    setMessage("");

    // Sign up the user with Supabase authentication
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Auth Error:", error.message);
      setError(error.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError("User ID not found. Please try again.");
      return;
    }

    console.log("✅ User ID:", userId);
    localStorage.setItem("userId", userId); // Store user ID for profile setup

    // Insert user into the "users" table
    const { error: dbError } = await supabase.from("users").insert([{ id: userId, email }]);

    if (dbError) {
      console.error("DB Insert Error:", dbError.message);
      setError("Signup successful, but failed to save user data.");
      return;
    }

    setMessage("Sign-up successful! Redirecting to profile setup...");
    setTimeout(() => navigate("/profile-setup"), 1500);
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>

      <p>Already have an account? <a href="/signin">Sign in</a></p>
    </div>
  );
}

export default SignUp;
