import React, { useState, useEffect } from 'react';
import '../styles/CropForm.css';

const CropForm = ({ crop, onSubmit, onCancel, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    crop_name: '',
    status: 'Active',
    planting_date: '',
    expected_harvest: '',
    ...crop
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (crop) {
      setFormData({
        crop_name: crop.crop_name || '',
        status: crop.status || 'Active',
        planting_date: crop.planting_date || '',
        expected_harvest: crop.expected_harvest || '',
      });
    }
  }, [crop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userId = localStorage.getItem("token");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const url = mode === 'add' 
        ? 'http://localhost:4000/crops/add-crop'
        : `http://localhost:4000/crops/update-crop/${crop.id}`;

      const response = await fetch(url, {
        method: mode === 'add' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: userId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save crop');
      }

      onSubmit(data.crop);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-form-modal">
      <div className="crop-form-content">
        <button className="close-button" onClick={onCancel}>×</button>
        <h2>{mode === 'add' ? 'Add New Crop' : 'Edit Crop'}</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="crop_name">Crop Name *</label>
            <input
              type="text"
              id="crop_name"
              name="crop_name"
              value={formData.crop_name}
              onChange={handleChange}
              required
              placeholder="Enter crop name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Planned">Planned</option>
              <option value="Harvested">Harvested</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="planting_date">Planting Date</label>
            <input
              type="date"
              id="planting_date"
              name="planting_date"
              value={formData.planting_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expected_harvest">Expected Harvest Date</label>
            <input
              type="date"
              id="expected_harvest"
              name="expected_harvest"
              value={formData.expected_harvest}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : mode === 'add' ? 'Add Crop' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropForm; 