const express = require("express");
const router = express.Router();
const { supabaseAdmin } = require("../config/supabaseClient");

// In communityRoutes.js, add this test route:
router.get("/test-supabase", async (req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('community_posts')
        .select('*')
        .limit(1);
        
      if (error) throw error;
      res.json({ success: true, data });
    } catch (error) {
      console.error("Supabase test failed:", error);
      res.status(500).json({ error: error.message });
    }
  });
// ✅ Fetch all posts
// communityRoutes.js - REPLACE your get-posts handler with this:
router.get("/get-posts", async (req, res) => {
    try {
      console.log("Attempting to fetch posts...");
      
      const { data, error } = await supabaseAdmin
        .from("community_posts")
        .select("*")
        .order("date", { ascending: false });
  
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
  
      console.log("Successfully fetched posts:", data.length);
      res.status(200).json(data);
      
    } catch (error) {
      console.error("Full error stack:", error);
      res.status(500).json({ 
        error: "Database operation failed",
        details: error.message,
        hint: "Check if table exists and connection is valid"
      });
    }
  });



// ✅ Add a new post
router.post("/add-post", async (req, res) => {
  const { user_id, title, content, image_url } = req.body;  // Changed from id to user_id

  if (!user_id || !title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  try {
      console.log("🔹 Fetching user data for user_id:", user_id);
      
      const { data: userData, error: userError } = await supabaseAdmin
          .from("user_details")
          .select("name")
          .eq("id", user_id)
          .single();

      if (userError) throw userError;

      const { data, error } = await supabaseAdmin
          .from("community_posts")
          .insert([{ 
              user_id,  // Store who created the post
              username: userData.name, 
              title, 
              content, 
              image_url, 
              date: new Date().toISOString(),  
              reactions: 0  
          }])
          .select()
          .single();

      if (error) throw error;

      res.status(201).json({ message: "Post added successfully", post: data });
  } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ error: "Error adding post", details: error.message });
  }
});

// ✅ Delete a post
router.delete("/delete-post/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const { data, error } = await supabaseAdmin
            .from("community_posts")
            .delete()
            .eq("id", postId);

        if (error) throw error;
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting post", details: error.message });
    }
});

// Update reactions route
router.post("/react/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
      const { data: post, error: fetchError } = await supabaseAdmin
          .from("community_posts")
          .select("reactions")
          .eq("id", postId)
          .single();

      if (fetchError) throw fetchError;

      // Ensure reactions is a number
      const currentReactions = Number(post.reactions) || 0;
      const newReaction = currentReactions + 1;

      const { data, error } = await supabaseAdmin
          .from("community_posts")
          .update({ reactions: newReaction })
          .eq("id", postId)
          .select();

      if (error) throw error;

      res.status(200).json({ message: "Reaction added", post: data });
  } catch (error) {
      res.status(500).json({ error: "Error updating reaction", details: error.message });
  }
});

module.exports = router;
