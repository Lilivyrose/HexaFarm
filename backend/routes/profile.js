const express = require("express");
const router = express.Router();
const { supabaseAdmin } = require("../config/supabaseClient");

// ✅ Profile Setup Route
router.post("/setup", async (req, res) => {
    const { userId, name, experience, farmingInterest, growingCrops } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    try {
        // Insert user details into `user_details` table
        const { error: detailsError } = await supabaseAdmin.from("user_details").insert([
            { id: userId, name, experience, farming_interest: farmingInterest }
        ]);
        if (detailsError) throw new Error(detailsError.message);

        // Insert crops into `my_crops` table (only if provided)
        if (growingCrops && growingCrops.length > 0) {
            const cropData = growingCrops.map(crop => ({ user_id: userId, crop_name: crop }));
        
            const { error: cropsError } = await supabaseAdmin
                .from("my_crops")
                .insert(cropData);
        
            if (cropsError) throw new Error(cropsError.message);
        }

        res.json({ message: "Profile setup successful!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
