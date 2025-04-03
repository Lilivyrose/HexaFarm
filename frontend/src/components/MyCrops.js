import { useState, useEffect } from "react";
import CropForm from "./CropForm";
import "../styles/MyCrops.css";
import "../styles/buttons.css";
import { supabase } from "../utils/supabaseClient";
import BackButton from './common/BackButton';

const MyCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');

  const fetchCrops = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw new Error("Authentication failed");
      }

      if (!session) {
        setError("Please log in to view your crops");
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      console.log("Fetching crops for user_id:", userId);

      const { data, error: dbError } = await supabase
        .from("my_crops")
        .select("*")
        .eq("user_id", userId);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(dbError.message);
      }

      console.log("Query result:", data);

      if (data && data.length > 0) {
        setCrops(data);
      } else {
        setCrops([]);
      }
    } catch (err) {
      console.error("Error fetching crops:", err);
      setError(`Failed to fetch crops: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleViewDetails = (crop) => {
    setSelectedCrop(crop);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCrop(null);
  };

  const handleAddCrop = () => {
    setFormMode('add');
    setSelectedCrop(null);
    setShowForm(true);
  };

  const handleEditCrop = (crop) => {
    setFormMode('edit');
    setSelectedCrop(crop);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCrop(null);
  };

  const handleFormSubmit = async (updatedCrop) => {
    try {
      if (formMode === 'add') {
        setCrops(prev => [...prev, updatedCrop]);
      } else {
        setCrops(prev => prev.map(crop => 
          crop.id === updatedCrop.id ? updatedCrop : crop
        ));
      }
      handleCloseForm();
      await fetchCrops();
    } catch (err) {
      setError('Failed to update crops list');
    }
  };

  const handleDeleteCrop = async (cropId) => {
    if (!window.confirm('Are you sure you want to delete this crop?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/crops/delete-crop/${cropId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete crop');
      }

      setCrops(prev => prev.filter(crop => crop.id !== cropId));
    } catch (err) {
      setError('Failed to delete crop');
    }
  };

  return (
    <div className="my-crops-container">
      <BackButton />
      <div className="my-crops-header">
  <h2 className="my-crops-title">My Crops</h2>
  {/* This is the only button that was removed from here */}
</div>

{/* Add this new floating button right before the closing </div> of the component */}
<button className="add-crop-button" onClick={handleAddCrop}>
  <span className="btn-icon">+</span>
  <span className="btn-text">Add New Crop</span>
</button>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && crops.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>
          <p className="empty-state-message">No crops found! Start by adding your first crop.</p>
          <button className="btn btn-primary" onClick={handleAddCrop}>
            Add Your First Crop
          </button>
        </div>
      )}

      {!loading && crops.length > 0 && (
        <div className="crops-grid">
          {crops.map((crop, index) => (
            <div key={index} className="crop-card">
              <h3 className="crop-name">{crop.crop_name}</h3>
              <div className="crop-details">
                <p>Status: {crop.status || 'Active'}</p>
                <p>Planting Date: {crop.planting_date || 'Not specified'}</p>
                <p>Expected Harvest: {crop.expected_harvest || 'Not specified'}</p>
              </div>
              <div className="crop-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleViewDetails(crop)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditCrop(crop)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCrop(crop.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDetails && selectedCrop && (
        <div className="crop-details-modal">
          <div className="crop-details-content">
            <button className="btn btn-ghost btn-icon close-button" onClick={handleCloseDetails}>×</button>
            <h2>{selectedCrop.crop_name}</h2>
            
            <div className="crop-basic-info">
              <h3>Basic Information</h3>
              <p>Status: {selectedCrop.status}</p>
              <p>Planting Date: {selectedCrop.planting_date || 'Not specified'}</p>
              <p>Expected Harvest: {selectedCrop.expected_harvest || 'Not specified'}</p>
            </div>

            {selectedCrop.growstuff_details && (
              <div className="growstuff-details">
                <h3>Growing Information</h3>
                <p><strong>Scientific Name:</strong> {selectedCrop.growstuff_details.scientific_name}</p>
                <p><strong>Description:</strong> {selectedCrop.growstuff_details.description}</p>
                <p><strong>Growing Degree Days:</strong> {selectedCrop.growstuff_details.growing_degree_days}</p>
                <p><strong>Sowing Method:</strong> {selectedCrop.growstuff_details.sowing_method}</p>
                <p><strong>Spread:</strong> {selectedCrop.growstuff_details.spread}</p>
                <p><strong>Row Spacing:</strong> {selectedCrop.growstuff_details.row_spacing}</p>
                <p><strong>Height:</strong> {selectedCrop.growstuff_details.height}</p>
                <p><strong>Sun Requirements:</strong> {selectedCrop.growstuff_details.sun_requirements}</p>
                <p><strong>Water Requirements:</strong> {selectedCrop.growstuff_details.water_requirements}</p>
                <p><strong>When to Plant:</strong> {selectedCrop.growstuff_details.when_to_plant}</p>
                <p><strong>Harvest Time:</strong> {selectedCrop.growstuff_details.harvest_time}</p>
                
                <div className="companion-plants">
                  <h4>Companion Plants</h4>
                  <ul>
                    {selectedCrop.growstuff_details.companion_plants?.map((plant, idx) => (
                      <li key={idx}>{plant}</li>
                    ))}
                  </ul>
                </div>

                <div className="pests">
                  <h4>Common Pests</h4>
                  <ul>
                    {selectedCrop.growstuff_details.pests?.map((pest, idx) => (
                      <li key={idx}>{pest}</li>
                    ))}
                  </ul>
                </div>

                <div className="diseases">
                  <h4>Common Diseases</h4>
                  <ul>
                    {selectedCrop.growstuff_details.diseases?.map((disease, idx) => (
                      <li key={idx}>{disease}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <CropForm
          crop={selectedCrop}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          mode={formMode}
        />
      )}
    </div>
  );
};

export default MyCrops;
