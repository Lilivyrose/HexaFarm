import React from 'react';
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact Us</a>
      </div>
      <div className="social-media">
        <a href="https://twitter.com/hexafarm">Twitter</a>
        <a href="https://facebook.com/hexafarm">Facebook</a>
        <a href="https://instagram.com/hexafarm">Instagram</a>
      </div>
      <p>© 2023 HexaFarm. All rights reserved.</p>
    </footer>
  );
};

export default Footer;