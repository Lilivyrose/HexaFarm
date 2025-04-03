import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import PostForm from "./PostForm";
import PostList from "./PostList";
import BackButton from "../components/common/BackButton";
import '../styles/Community.css';

const Community = () => {
    const [userId, setUserId] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // ✅ Fetch user ID from Supabase Auth
    useEffect(() => {
        const fetchUserId = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) console.error("Session fetch error:", error);
            if (session) setUserId(session.user.id);
        };
        fetchUserId();
        fetchPosts();
    }, []);

    // ✅ Fetch community posts
    const fetchPosts = async () => {
        try {
            console.log("Starting fetch...");
            const response = await fetch("http://localhost:3001/community/get-posts");
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error details:", errorData);
                throw new Error(errorData.error || "Server error");
            }
            
            const data = await response.json();
            console.log("Received posts:", data.length);
            setPosts(data);
            
        } catch (error) {
            console.error("Full fetch error:", error);
            setError(error.message);
        }
    };

    return (
        <div className="community-container">
            <BackButton />

            <div className="community-header">
                <h2>Community Posts</h2>
                <p>Connect and share with fellow plant enthusiasts</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="community-content">
                {userId && (
                    <div className="create-post-section">
                        <h3>Share Your Experience</h3>
                        <PostForm userId={userId} fetchPosts={fetchPosts} />
                    </div>
                )}

                <div className="posts-section">
                    <h3>Recent Posts</h3>
                    <PostList posts={posts} fetchPosts={fetchPosts} />
                </div>
            </div>
        </div>
    );
};

export default Community;
