const express = require("express");
const router = express.Router();
const { supabase } = require("../config/supabaseClient"); // Ensure Supabase client is properly initialized
const axios = require('axios');

// Function to fetch crop details from Growstuff API
const fetchGrowstuffDetails = async (cropName) => {
  try {
    const response = await axios.get(`https://www.growstuff.org/crops/${encodeURIComponent(cropName)}.json`);
    return {
      scientific_name: response.data.scientific_name,
      description: response.data.description,
      growing_degree_days: response.data.growing_degree_days,
      sowing_method: response.data.sowing_method,
      spread: response.data.spread,
      row_spacing: response.data.row_spacing,
      height: response.data.height,
      sun_requirements: response.data.sun_requirements,
      water_requirements: response.data.water_requirements,
      when_to_plant: response.data.when_to_plant,
      harvest_time: response.data.harvest_time,
      companion_plants: response.data.companion_plants,
      pests: response.data.pests,
      diseases: response.data.diseases
    };
  } catch (error) {
    console.error('Error fetching Growstuff details:', error);
    return null;
  }
};

// Route: GET /crops/my-crops?user_id=<user_id>
router.get("/my-crops", async (req, res) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { data, error } = await supabase
      .from("my_crops")
      .select("id, crop_name, status, planting_date, expected_harvest")
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    if (data.length === 0) {
      return res.status(200).json({ message: "No crops found", crops: [] });
    }

    // Fetch Growstuff details for each crop
    const cropsWithDetails = await Promise.all(
      data.map(async (crop) => {
        const growstuffDetails = await fetchGrowstuffDetails(crop.crop_name);
        return {
          ...crop,
          growstuff_details: growstuffDetails
        };
      })
    );

    res.status(200).json({ 
      message: "Crops retrieved successfully", 
      crops: cropsWithDetails 
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: GET /crops/crop-details/:cropName
router.get("/crop-details/:cropName", async (req, res) => {
  try {
    const { cropName } = req.params;
    
    if (!cropName) {
      return res.status(400).json({ message: "Crop name is required" });
    }

    const growstuffDetails = await fetchGrowstuffDetails(cropName);
    
    if (!growstuffDetails) {
      return res.status(404).json({ message: "Crop details not found" });
    }

    res.status(200).json({ 
      message: "Crop details retrieved successfully", 
      details: growstuffDetails 
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: POST /crops/add-crop
router.post("/add-crop", async (req, res) => {
  try {
    const { user_id, crop_name, status, planting_date, expected_harvest } = req.body;

    if (!user_id || !crop_name) {
      return res.status(400).json({ message: "User ID and crop name are required" });
    }

    // Fetch Growstuff details before adding the crop
    const growstuffDetails = await fetchGrowstuffDetails(crop_name);

    const { data, error } = await supabase
      .from("my_crops")
      .insert([
        {
          user_id,
          crop_name,
          status: status || 'Active',
          planting_date: planting_date || null,
          expected_harvest: expected_harvest || null,
          growstuff_details: growstuffDetails
        }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    res.status(201).json({ 
      message: "Crop added successfully", 
      crop: data[0] 
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: PUT /crops/update-crop/:id
router.put("/update-crop/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { crop_name, status, planting_date, expected_harvest } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Crop ID is required" });
    }

    // If crop name is being updated, fetch new Growstuff details
    let growstuffDetails;
    if (crop_name) {
      growstuffDetails = await fetchGrowstuffDetails(crop_name);
    }

    const updateData = {
      crop_name: crop_name || undefined,
      status: status || undefined,
      planting_date: planting_date || undefined,
      expected_harvest: expected_harvest || undefined,
      ...(growstuffDetails && { growstuff_details: growstuffDetails })
    };

    const { data, error } = await supabase
      .from("my_crops")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json({ 
      message: "Crop updated successfully", 
      crop: data[0] 
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: DELETE /crops/delete-crop/:id
router.delete("/delete-crop/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Crop ID is required" });
    }

    const { error } = await supabase
      .from("my_crops")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
