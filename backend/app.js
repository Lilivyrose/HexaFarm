const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const testSupabase = require("./routes/testSupabase");
const profileRoutes = require("./routes/profile"); // ✅ Import profile setup route
const myCrops = require("./routes/crops");
const spaceAnalysisRouter = require('./routes/spaceAnalysis');
const multer = require('multer');
const path = require('path');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const communityRoutes = require("./routes/communityRoutes");

const app = express();

// Configure CORS more explicitly
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true, // if using cookies
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/test", testSupabase);
app.use("/profile", profileRoutes); 
app.use("/crops",myCrops);
app.use("/community", communityRoutes);
// Mount the space analysis route
app.use('/api/space-analysis', spaceAnalysisRouter);

// Mount the auth route
app.use('/api/auth', authRouter);

// Mount the profile route
app.use('/api/profile', profileRouter);

// Basic file upload setup
const upload = multer({ dest: 'uploads/' });

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Simple space analysis endpoint
app.post('/api/space-analysis', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Send back some test data
    res.json({
      success: true,
      plantAreas: [
        {
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          lightLevel: 'High',
          suggestedPlant: 'Test Plant'
        }
      ],
      dimensions: {
        width: 800,
        height: 600
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('CORS enabled for frontend at http://localhost:3000');
});

module.exports = app;
