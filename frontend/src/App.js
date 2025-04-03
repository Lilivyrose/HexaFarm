import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProfileSetup from "./components/ProfileSetup";
import Intro from "./components/firstpage/Intro";
import { supabase } from "./utils/supabaseClient";
import "./App.css";
import MyCrops from './components/MyCrops';
import SpaceUtilization from './components/SpaceUtilization';
import CropRecommendations from './components/CropRecommendations';
import GrowthTracking from './components/GrowthTracking';
import Community from './components/Community';
import Resources from './components/Resources';
import ProtectedRoute from './components/ProtectedRoute';
import DiseaseDetection from './components/DiseaseDetection';
import CropDetails from './components/CropDetails';
import BugCatcher from "./Games/BugCatcher";
import MemoryGame from './Games/MemoryGame';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check authentication state on initial load
  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const checkAuth = async () => {
      console.log("App.js: Checking authentication state...");
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log("App.js: User fetched:", user);

      if (!isMounted) return; // Exit if the component is unmounted

      if (error || !user) {
        console.log("App.js: No user found, redirecting to /...");
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/"); // Redirect to Intro Page
      } else {
        console.log("App.js: User authenticated, setting user state...");
        setUser(user); // Set the user state
      }
    };

    checkAuth();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []); // Remove navigate from the dependency array

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/signin" element={<SignIn setUser={setUser} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/*" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/mycrops" element={<MyCrops />} />
      <Route path="/space-utilization" element={<SpaceUtilization />} />
      <Route path="/crop-recommendations" element={<CropRecommendations />} />
      <Route path="/growth-tracking" element={<GrowthTracking />} />
      <Route path="/community" element={<Community />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/disease-detection" element={<DiseaseDetection />} />
      <Route path="//crop-details" element={<CropDetails />} />
      <Route path="/bug-catcher" element={<BugCatcher />} />
      <Route path="/memory-game" element={<MemoryGame />} />
      <Route path="*" element={<Navigate to="*" />} /> {/* Fallback route */}
    </Routes>
  );
}

export default App;