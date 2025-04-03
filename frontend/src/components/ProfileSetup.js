import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileSetup.css";

const steps = [
  { id: 1, question: "What is your name?", key: "name", required: true },
  { id: 2, question: "What is your farming experience?", key: "experience", required: true, options: ["Beginner", "Intermediate", "Expert"] },
  { id: 3, question: "What is your farming interest?", key: "farmingInterest", required: false, options: ["Balcony", "Hydroponics", "Outdoor", "Community"] },
  { id: 4, question: "Are you currently growing any crops? (Comma-separated)", key: "growingCrops", required: false },
];

function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", experience: "", farmingInterest: "", growingCrops: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No user ID found. Please sign up again.");
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (steps[currentStep].key === "growingCrops") {
      setFormData({ ...formData, growingCrops: e.target.value.split(",").map(crop => crop.trim()) });
    } else {
      setFormData({ ...formData, [steps[currentStep].key]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No user ID found. Please sign up again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile setup failed");
      }

      // If successful, navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Just show the error message without throwing
      alert("Error setting up profile: " + err.message);
    }
  };

  return (
    <div className="profile-setup-container">
      <h2>{steps[currentStep].question}</h2>

      {steps[currentStep].options ? (
        <select value={formData[steps[currentStep].key]} onChange={handleChange}>
          <option value="">Select</option>
          {steps[currentStep].options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input type="text" value={formData[steps[currentStep].key]} onChange={handleChange} />
      )}

      <div className="button-group">
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default ProfileSetup;
