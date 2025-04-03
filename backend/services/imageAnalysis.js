const sharp = require('sharp');

const analyzeImage = async (imagePath) => {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Get image stats for light analysis
    const stats = await image
      .greyscale()
      .stats();

    // Calculate regions based on image size
    const regions = calculateRegions(metadata.width, metadata.height, stats);

    return {
      plantAreas: regions.map(region => ({
        x: region.x,
        y: region.y,
        width: region.width,
        height: region.height,
        lightLevel: region.lightLevel,
        suggestedPlant: suggestPlantForLight(region.lightLevel)
      })),
      dimensions: {
        width: metadata.width,
        height: metadata.height
      }
    };
  } catch (error) {
    throw new Error('Failed to analyze image: ' + error.message);
  }
};

const calculateRegions = (width, height, stats) => {
  const regions = [];
  const blockSize = Math.min(width, height) / 4; // Divide image into regions

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      const brightness = stats.channels[0].mean;
      regions.push({
        x: x,
        y: y,
        width: Math.min(blockSize, width - x),
        height: Math.min(blockSize, height - y),
        lightLevel: categorizeLightLevel(brightness)
      });
    }
  }
  
  return regions;
};

const categorizeLightLevel = (brightness) => {
  if (brightness > 170) return 'high';
  if (brightness > 85) return 'medium';
  return 'low';
};

const suggestPlantForLight = (lightLevel) => {
  switch (lightLevel) {
    case 'high':
      return 'Sun-loving plants (e.g., Succulents)';
    case 'medium':
      return 'Medium-light plants (e.g., Pothos)';
    case 'low':
      return 'Shade-tolerant plants (e.g., Snake Plant)';
    default:
      return 'Various plants';
  }
};

module.exports = {
  analyzeImage
}; 