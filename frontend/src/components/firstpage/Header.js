import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">🌱 HexaFarm</div>
      <nav className="nav">
        <Link to="/signin" className="nav-link">Sign In</Link> {/* Use Link */}
        <Link to="/signup" className="nav-link signup">Sign Up</Link> {/* Use Link */}
      </nav>
    </header>
  );
};

export default Header;