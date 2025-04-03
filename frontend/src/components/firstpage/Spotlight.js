import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./spot.css";
const Spotlight = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate("/signup"); // Redirect to Sign In page
  };

  return (
    <section className="spotlight">
      <h1>Optimize Your Farming with AI</h1>
      <p>HexaFarm helps you maximize your farming space, get crop recommendations, and monitor plant health effortlessly.</p>
      <button className="cta-button" onClick={handleGetStarted}>Get Started</button> {/* Add onClick handler */}
    </section>
  );
};

export default Spotlight;