import React, { useState, useRef, useEffect } from 'react';
import "../styles/SpaceUtilization.css";

const SpaceUtilization = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw the original image
          ctx.drawImage(img, 0, 0);
          
          // Example: Draw some sample plant placement boxes
          // In a real application, you would use AI/ML to determine these positions
          drawPlantPlacementBoxes(ctx, canvas.width, canvas.height);
          
          setIsProcessing(false);
        };
        img.src = e.target.result;
        setSelectedImage(e.target.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const drawPlantPlacementBoxes = (ctx, width, height) => {
    // Example box placements - in a real app, these would come from AI/ML analysis
    const boxes = [
      { x: width * 0.2, y: height * 0.2, w: 100, h: 100 },
      { x: width * 0.5, y: height * 0.3, w: 120, h: 120 },
      { x: width * 0.7, y: height * 0.6, w: 90, h: 90 }
    ];

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    boxes.forEach(box => {
      ctx.strokeRect(box.x, box.y, box.w, box.h);
      
      // Add plant icon or label
      ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      ctx.fillRect(box.x, box.y, box.w, box.h);
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.fillText('🌱 Plant Here', box.x + 10, box.y + 20);
    });
  };

  return (
    <div className="space-utilization">
      <h2>Space Utilization Planner</h2>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        <p className="upload-instructions">
          Upload a photo of your space to get plant placement suggestions
        </p>
      </div>

      {isProcessing && (
        <div className="processing-message">
          <p>Processing your image...</p>
          <div className="spinner"></div>
        </div>
      )}

      {selectedImage && (
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="space-canvas"
          />
          <div className="suggestions">
            <h3>Suggested Plants:</h3>
            <ul>
              <li>🌿 Snake Plant - Low light areas</li>
              <li>🌱 Pothos - Hanging areas</li>
              <li>🌸 Peace Lily - Medium light spots</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceUtilization;