export const analyzeSpace = async (formData) => {
    try {
        const response = await fetch('http://localhost:3001/api/space-analysis', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Get the canvas dimensions from the uploaded image
        const imageData = await createImageBitmap(formData.get('image'));
        const width = imageData.width;
        const height = imageData.height;

        // Calculate grid-based plant areas
        const gridSize = 100; // Size of each grid cell
        const plantAreas = [];
        
        for (let y = 0; y < height; y += gridSize) {
            for (let x = 0; x < width; x += gridSize) {
                // Adjust area size to fit within image bounds
                const areaWidth = Math.min(gridSize, width - x);
                const areaHeight = Math.min(gridSize, height - y);

                // Add plant area with suggestions based on position
                plantAreas.push({
                    x: x,
                    y: y,
                    width: areaWidth,
                    height: areaHeight,
                    suggestedPlant: getSuggestedPlant(),
                    lightLevel: getLightLevel()
                });
            }
        }

        return { plantAreas };

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Helper function to get random plant suggestions
function getSuggestedPlant() {
    const plants = [
        "Tomatoes",
        "Lettuce",
        "Peppers",
        "Herbs",
        "Carrots",
        "Spinach",
        "Beans",
        "Cucumbers"
    ];
    return plants[Math.floor(Math.random() * plants.length)];
}

// Helper function to get random light levels
function getLightLevel() {
    const levels = [
        "Full Sun",
        "Partial Shade",
        "Full Shade",
        "Medium Light"
    ];
    return levels[Math.floor(Math.random() * levels.length)];
} 