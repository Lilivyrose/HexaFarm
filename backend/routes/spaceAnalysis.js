const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Add plant database
const plantDatabase = {
  'Snake Plant': {
    name: 'Snake Plant (Sansevieria)',
    lightNeeds: 'Low to Medium',
    waterNeeds: 'Low - Water every 2-3 weeks',
    care: 'Very easy - Tolerant of neglect',
    benefits: 'Air purifying, Removes toxins',
    size: 'Height: 0.5-2m',
    tips: 'Excellent for beginners'
  },
  'Pothos': {
    name: 'Pothos (Epipremnum aureum)',
    lightNeeds: 'Low to Bright indirect',
    waterNeeds: 'Moderate - Water when top soil is dry',
    care: 'Easy - Very adaptable',
    benefits: 'Air purifying, Fast growing',
    size: 'Trails up to 3m+',
    tips: 'Great for hanging baskets'
  },
  'Succulent': {
    name: 'Succulent varieties',
    lightNeeds: 'Bright direct to indirect',
    waterNeeds: 'Low - Water when soil is completely dry',
    care: 'Easy - Requires good drainage',
    benefits: 'Drought resistant, Decorative',
    size: 'Varies by type: 5cm-30cm',
    tips: 'Need well-draining soil'
  },
  'Peace Lily': {
    name: 'Peace Lily (Spathiphyllum)',
    lightNeeds: 'Low to Medium indirect',
    waterNeeds: 'Moderate - Keep soil lightly moist',
    care: 'Easy - Shows clear signs when needs water',
    benefits: 'Air purifying, Flowering plant, Humidity loving',
    size: 'Height: 0.3-1m, Spread: 0.3-0.5m',
    tips: 'Great bathroom plant, Droops when needs water'
  }
};

const analyzeSpaces = (width, height) => {
  const areas = [
    {
      x: Math.round(width * 0.1),
      y: Math.round(height * 0.1),
      width: Math.round(width * 0.3),
      height: Math.round(height * 0.3),
      lightLevel: 'High',
      suggestedPlant: 'Succulent',
      plantDetails: plantDatabase['Succulent']
    },
    {
      x: Math.round(width * 0.5),
      y: Math.round(height * 0.2),
      width: Math.round(width * 0.25),
      height: Math.round(height * 0.4),
      lightLevel: 'Medium',
      suggestedPlant: 'Pothos',
      plantDetails: plantDatabase['Pothos']
    },
    {
      x: Math.round(width * 0.15),
      y: Math.round(height * 0.6),
      width: Math.round(width * 0.35),
      height: Math.round(height * 0.3),
      lightLevel: 'Low',
      suggestedPlant: 'Snake Plant',
      plantDetails: plantDatabase['Snake Plant']
    }
  ];

  return areas;
};

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received file upload request');

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ 
        success: false, 
        error: 'No image file uploaded' 
      });
    }

    console.log('Processing file:', req.file.path);

    // Process the image with sharp
    const image = sharp(req.file.path);
    const metadata = await image.metadata();

    console.log('Image metadata:', metadata);

    // Generate plant areas
    const plantAreas = analyzeSpaces(metadata.width, metadata.height);

    console.log('Generated plant areas:', plantAreas);

    // Clean up: remove uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Send response
    return res.json({
      success: true,
      plantAreas: plantAreas,
      dimensions: {
        width: metadata.width,
        height: metadata.height
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Error processing image' 
    });
  }
});

function generatePlantAreas(width, height) {
  // Generate some sample areas for testing
  const areas = [
    {
      x: Math.round(width * 0.1),  // 10% from left
      y: Math.round(height * 0.1), // 10% from top
      width: Math.round(width * 0.2),
      height: Math.round(height * 0.2),
      lightLevel: 'high',
      suggestedPlant: 'Succulent'
    },
    {
      x: Math.round(width * 0.4),  // 40% from left
      y: Math.round(height * 0.3), // 30% from top
      width: Math.round(width * 0.25),
      height: Math.round(height * 0.25),
      lightLevel: 'medium',
      suggestedPlant: 'Pothos'
    },
    {
      x: Math.round(width * 0.7),  // 70% from left
      y: Math.round(height * 0.6), // 60% from top
      width: Math.round(width * 0.2),
      height: Math.round(height * 0.2),
      lightLevel: 'low',
      suggestedPlant: 'Snake Plant'
    }
  ];

  return areas;
}

router.post("/setup", upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        // Process image with sharp
        const imageBuffer = await sharp(req.file.path)
            .grayscale()
            .normalize()
            .toBuffer();

        const metadata = await sharp(req.file.path).metadata();
        const { width, height } = metadata;

        // Get raw pixel data
        const { data } = await sharp(imageBuffer)
            .raw()
            .toBuffer({ resolveWithObject: true });

        const openSpaces = [];
        const gridSize = 15;
        const brightnessThreshold = 160;
        const minSpaceSize = 30;

        // Scan for bright regions
        for (let y = 0; y < height; y += gridSize) {
            for (let x = 0; x < width; x += gridSize) {
                let avgBrightness = 0;
                let count = 0;

                // Calculate average brightness for current cell
                for (let dy = 0; dy < gridSize && (y + dy) < height; dy++) {
                    for (let dx = 0; dx < gridSize && (x + dx) < width; dx++) {
                        const idx = ((y + dy) * width + (x + dx));
                        avgBrightness += data[idx];
                        count++;
                    }
                }

                avgBrightness = avgBrightness / count;

                if (avgBrightness > brightnessThreshold) {
                    openSpaces.push({
                        x,
                        y,
                        width: Math.min(gridSize, width - x),
                        height: Math.min(gridSize, height - y)
                    });
                }
            }
        }

        // Clean up
        fs.unlinkSync(req.file.path);

        console.log(`Found ${openSpaces.length} open spaces`);

        res.json({
            success: true,
            plantAreas: openSpaces
        });

    } catch (err) {
        console.error('Error processing image:', err);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: err.message });
    }
});

function detectOpenSpaces(imageData, width, height) {
    const openSpaces = [];
    const visited = new Set();
    const cellSize = 20; // Smaller cells for finer detection
    const brightnessThreshold = 120; // More sensitive threshold
    const minRegionSize = 400; // Minimum pixel area to consider

    // Helper function to get pixel brightness
    const getBrightness = (x, y) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;
        return imageData[y * width + x];
    };

    // Flood fill to find connected bright regions
    const floodFill = (startX, startY) => {
        const queue = [[startX, startY]];
        const region = new Set();
        let minX = startX, maxX = startX;
        let minY = startY, maxY = startY;
        let totalBrightness = 0;

        while (queue.length > 0) {
            const [x, y] = queue.pop();
            const key = `${x},${y}`;

            if (visited.has(key)) continue;
            visited.add(key);

            const brightness = getBrightness(x, y);
            if (brightness < brightnessThreshold) continue;

            region.add(key);
            totalBrightness += brightness;
            
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);

            // Check neighbors (8-directional)
            const neighbors = [
                [x-1, y], [x+1, y], [x, y-1], [x, y+1],
                [x-1, y-1], [x-1, y+1], [x+1, y-1], [x+1, y+1]
            ];

            for (const [nx, ny] of neighbors) {
                const key = `${nx},${ny}`;
                if (!visited.has(key) && 
                    nx >= 0 && nx < width && 
                    ny >= 0 && ny < height) {
                    queue.push([nx, ny]);
                }
            }
        }

        return {
            size: region.size,
            avgBrightness: totalBrightness / region.size,
            bounds: {
                x: minX,
                y: minY,
                width: maxX - minX + 1,
                height: maxY - minY + 1
            }
        };
    };

    // Scan the image with overlap
    for (let y = 0; y < height; y += Math.floor(cellSize/2)) {
        for (let x = 0; x < width; x += Math.floor(cellSize/2)) {
            const key = `${x},${y}`;
            if (visited.has(key)) continue;

            const brightness = getBrightness(x, y);
            if (brightness >= brightnessThreshold) {
                const region = floodFill(x, y);
                
                if (region.size >= minRegionSize) {
                    // Split large regions into smaller sections
                    const { bounds } = region;
                    const sections = splitRegion(bounds);
                    openSpaces.push(...sections);
                }
            }
        }
    }

    return mergeOverlappingSpaces(openSpaces);
}

function splitRegion(bounds) {
    const sections = [];
    const maxSectionSize = 100; // Maximum size for each section
    const overlap = 10; // Overlap between sections

    for (let y = bounds.y; y < bounds.y + bounds.height; y += maxSectionSize - overlap) {
        for (let x = bounds.x; x < bounds.x + bounds.width; x += maxSectionSize - overlap) {
            sections.push({
                x: x,
                y: y,
                width: Math.min(maxSectionSize, bounds.x + bounds.width - x),
                height: Math.min(maxSectionSize, bounds.y + bounds.height - y)
            });
        }
    }

    return sections;
}

function mergeOverlappingSpaces(spaces) {
    const merged = [...spaces];
    let hadOverlap = true;

    while (hadOverlap) {
        hadOverlap = false;
        for (let i = 0; i < merged.length; i++) {
            for (let j = i + 1; j < merged.length; j++) {
                if (checkOverlap(merged[i], merged[j])) {
                    merged[i] = mergeSpaces(merged[i], merged[j]);
                    merged.splice(j, 1);
                    hadOverlap = true;
                    break;
                }
            }
            if (hadOverlap) break;
        }
    }

    return merged;
}

function checkOverlap(space1, space2) {
    return !(space1.x + space1.width < space2.x ||
        space2.x + space2.width < space1.x ||
        space1.y + space1.height < space2.y ||
        space2.y + space2.height < space1.y);
}

function mergeSpaces(space1, space2) {
    return {
        x: Math.min(space1.x, space2.x),
        y: Math.min(space1.y, space2.y),
        width: Math.max(space1.x + space1.width, space2.x + space2.width) - Math.min(space1.x, space2.x),
        height: Math.max(space1.y + space1.height, space2.y + space2.height) - Math.min(space1.y, space2.y)
    };
}

module.exports = router; 