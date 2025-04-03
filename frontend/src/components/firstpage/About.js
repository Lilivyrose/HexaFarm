import React from 'react';
import "./about.css";
const About = () => {
  return (
    <section className="about">
      <h2>About HexaFarm</h2>
      <p>HexaFarm is a modern, AI-driven platform designed to help farmers, gardeners, and plant enthusiasts optimize their farming space, get personalized crop recommendations, and monitor plant health with ease.</p>
      <div className="features">
        <div className="feature">
          <h3>AI Space Utilization</h3>
          <p>Automatically analyze and optimize plant layout using AI.</p>
        </div>
        <div className="feature">
          <h3>Crop Recommendations</h3>
          <p>Get AI-driven crop suggestions based on your location, soil, and climate.</p>
        </div>
        <div className="feature">
          <h3>Plant Disease Detection</h3>
          <p>Identify plant diseases using AI and get recommended treatments.</p>
        </div>
      </div>
    </section>
  );
};

export default About;