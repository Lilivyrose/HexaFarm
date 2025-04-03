import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import '../styles/DiseaseDetection.css';
import BackButton from './common/BackButton';

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = "https://teachablemachine.withgoogle.com/models/hMnNpCsrd/";
        const model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
        setModel(model);
      } catch (error) {
        setError("Failed to load the model. Please try again later.");
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError(null);
    setPrediction(null);
    setLoading(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeImage = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDetect = async () => {
    if (!image || !model) {
      setError("Please wait for the model to load and upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.src = image;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const predictions = await model.predict(img);
      
      // Filter predictions with confidence threshold and sort by highest confidence
      const filteredPredictions = predictions
        .filter(pred => pred.probability >= 0.35)
        .sort((a, b) => b.probability - a.probability);

      if (filteredPredictions.length === 0) {
        setPrediction([{
          className: "No disease detected",
          probability: 1
        }]);
      } else {
        setPrediction(filteredPredictions);
      }
    } catch (error) {
      setError("Failed to detect disease. Please try again.");
      console.error("Error during prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-detection-container">
      <BackButton />
      <div className="disease-detection">
        <h2>Disease Detection</h2>
        <p>Upload an image of a plant leaf to detect potential diseases</p>

        <div className="upload-section">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <label htmlFor="image-upload">
            {image ? (
              <div className="image-preview">
                <img src={image} alt="Preview" />
                <button 
                  className="change-image-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChangeImage();
                  }}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">📸</span>
                <span className="upload-text">Click to upload an image</span>
              </div>
            )}
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          onClick={handleDetect} 
          disabled={!image || loading || !model}
          className={`detect-button ${loading ? 'loading' : ''} ${!model ? 'disabled' : ''}`}
        >
          {loading ? 'Detecting...' : !model ? 'Loading Model...' : 'Detect Disease'}
        </button>

        {prediction && (
          <div className="results-section">
            <h3>Detection Results</h3>
            {prediction.map((pred, index) => (
              <div key={index} className="prediction-item">
                <span className="prediction-label">{pred.className}</span>
                <span className="prediction-confidence">
                  {(pred.probability * 100).toFixed(1)}%
                </span>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${pred.probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;
