// Main component file
import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { analyzeSpace } from './api';

const SpaceUtilization = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setIsProcessing(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw original image
          ctx.drawImage(img, 0, 0);

          try {
            // Analyze the image
            const analysisResult = await analyzeSpace(file);
            
            // Draw boxes for open spaces
            if (analysisResult.plantAreas) {
              analysisResult.plantAreas.forEach(area => {
                // Draw border
                ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
                ctx.lineWidth = 1;
                ctx.strokeRect(area.x, area.y, area.width, area.height);
                
                // Very light fill
                ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
                ctx.fillRect(area.x, area.y, area.width, area.height);
              });
            }
          } catch (error) {
            console.error('Error analyzing image:', error);
          }
          setIsProcessing(false);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  const renderPlantDetails = (plantAreas) => {
    if (!plantAreas || plantAreas.length === 0) {
      return null;
    }

    return (
      <div className="plant-details-section">
        <h3>Recommended Plants Details</h3>
        {plantAreas.map((area, index) => {
          // Check if plantDetails exists
          if (!area.plantDetails) {
            return (
              <div key={index} className="plant-card">
                <h4>{area.suggestedPlant}</h4>
                <p>Light Level: {area.lightLevel}</p>
              </div>
            );
          }

          const details = area.plantDetails;
          return (
            <div key={index} className="plant-card">
              <h4>{details.name || area.suggestedPlant}</h4>
              <div className="plant-info-grid">
                <div className="info-item">
                  <span className="label">Light Needs:</span>
                  <span>{details.lightNeeds || area.lightLevel}</span>
                </div>
                {details.waterNeeds && (
                  <div className="info-item">
                    <span className="label">Water Needs:</span>
                    <span>{details.waterNeeds}</span>
                  </div>
                )}
                {details.care && (
                  <div className="info-item">
                    <span className="label">Care Level:</span>
                    <span>{details.care}</span>
                  </div>
                )}
                {details.benefits && (
                  <div className="info-item">
                    <span className="label">Benefits:</span>
                    <span>{details.benefits}</span>
                  </div>
                )}
                {details.size && (
                  <div className="info-item">
                    <span className="label">Size:</span>
                    <span>{details.size}</span>
                  </div>
                )}
                {details.tips && (
                  <div className="info-item">
                    <span className="label">Tips:</span>
                    <span>{details.tips}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-utilization">
      <h2>Space Utilization Planner</h2>
      
      <div className="file-input-container">
        <label className="file-input-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          Choose an Image
        </label>
        <p className="file-input-text">
          Upload an image to analyze available spaces
        </p>
      </div>

      {isProcessing && (
        <div className="processing-message">
          <div className="loading"></div>
          Analyzing spaces...
        </div>
      )}

      <div className="canvas-container">
        <canvas ref={canvasRef} className="analysis-canvas" />
      </div>

      {result?.plantAreas && !isProcessing && (
        <div className="results-container">
          {renderPlantDetails(result.plantAreas)}
        </div>
      )}
    </div>
  );
};

export default SpaceUtilization; 