import React, { useState, useRef } from 'react';
import BackButton from './common/BackButton';
import { analyzeSpace } from './api';
import '../styles/SpaceUtilization.css';

const SpaceUtilization = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                setSelectedImage(img);
                drawImageOnCanvas(img);
            };
        };
        reader.readAsDataURL(file);
    };

    const drawImageOnCanvas = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;
        setIsAnalyzing(true);
        try {
            const canvas = canvasRef.current;
            const imageBlob = await new Promise(resolve => canvas.toBlob(resolve));
            const formData = new FormData();
            formData.append('image', imageBlob, 'image.jpg');
            
            const result = await analyzeSpace(formData);
            console.log('Analysis result:', result);
            
            // Draw analysis results on canvas
            const ctx = canvas.getContext('2d');
            
            // First, redraw the original image
            ctx.drawImage(selectedImage, 0, 0);
            
            // Then draw the plant areas
            result.plantAreas.forEach(area => {
                // Draw semi-transparent green rectangle
                ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                ctx.fillRect(area.x, area.y, area.width, area.height);
                
                // Draw border
                ctx.strokeStyle = '#2E7D32';
                ctx.lineWidth = 2;
                ctx.strokeRect(area.x, area.y, area.width, area.height);
                
                // Draw text background
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(area.x, area.y, area.width, 40);
                
                // Draw text
                ctx.fillStyle = 'white';
                ctx.font = '14px Arial';
                ctx.fillText(area.suggestedPlant, area.x + 5, area.y + 20);
                ctx.fillText(area.lightLevel, area.x + 5, area.y + 35);
            });
        } catch (error) {
            console.error('Error analyzing space:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-utilization-container">
            <BackButton />
            <div className="content">
                <h1>Space Utilization Analysis</h1>
                <p>Upload a photo of your garden space to analyze planting opportunities</p>

                <div className="upload-section">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button 
                        className="upload-button"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Upload Image
                    </button>
                </div>

                {selectedImage && (
                    <button 
                        className="analyze-button"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Space'}
                    </button>
                )}

                {isAnalyzing && (
                    <div className="analyzing">
                        <p>Analyzing your space...</p>
                    </div>
                )}

                <div className="canvas-container">
                    <canvas
                        ref={canvasRef}
                        style={{ display: selectedImage ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SpaceUtilization; 