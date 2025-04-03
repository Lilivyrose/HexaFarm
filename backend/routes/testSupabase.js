const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");

// ✅ Test Supabase connection
router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) {
        return res.status(500).json({ message: "Supabase connection failed", error });
    }

    res.json({ message: "Supabase connected!", data });
});

module.exports = router;
