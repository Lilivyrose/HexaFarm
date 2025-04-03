const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ✅ Ensure Environment Variables Are Loaded
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Missing Supabase environment variables. Check your .env file.");
    process.exit(1); // Exit if env variables are missing
}

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create Supabase Clients
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY
);
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_ANON_KEY
);

// ✅ Middleware for Authentication
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabaseAdmin.auth.getUser(token); // ✅ Use supabaseAdmin

    if (error || !data?.user) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error?.message });
    }

    req.user = data.user;
    next();
};

// ✅ Signup Route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // ✅ Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
        email,
        password
    });

    if (authError) {
        return res.status(400).json({ message: "Signup failed", error: authError.message });
    }

    // ✅ Insert user into the 'users' table without password
    const { data: userData, error: userError } = await supabaseAdmin
        .from("users")
        .insert([{ id: authData.user.id, email: authData.user.email }]);

    if (userError) {
        return res.status(500).json({ message: "Signup successful, but failed to save user data", error: userError.message });
    }

    res.json({ message: "Signup successful!", user: authData.user });
});


// ✅ Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(400).json({ message: "Login failed", error: error.message });
    }

    res.json({ message: "Login successful", token: data.session.access_token });
});

// ✅ Profile Setup Route
app.post('/profile/profile-setup', authenticateUser, async (req, res) => {
    const { name, experience, farmingInterest, growingCrops } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        // Update the user's profile in the database
        const { data, error } = await supabaseAdmin
            .from("profiles")
            .upsert([
                {
                    user_id: userId,
                    name,
                    experience,
                    farming_interest: farmingInterest,
                    growing_crops: growingCrops,
                },
            ]);

        if (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ message: "Failed to update profile", error: error.message });
        }

        res.status(200).json({ message: "Profile setup successful!", data });
    } catch (err) {
        console.error("Profile setup error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// ✅ Protected Route
app.get('/protected-route', authenticateUser, (req, res) => {
    res.json({ message: "You accessed a protected route!", user: req.user });
});

module.exports = app;