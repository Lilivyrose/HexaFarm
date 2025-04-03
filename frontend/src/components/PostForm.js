import { useState } from "react";

const PostForm = ({ userId, fetchPosts }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const addPost = async () => {
        if (!title || !content) {
            alert("Title and content are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/community/add-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, title, content, image_url: imageUrl })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to add post");

            setTitle("");
            setContent("");
            setImageUrl("");
            setIsFormVisible(false); // Close form after posting
            fetchPosts();
        } catch (error) {
            console.error("Error adding post:", error);
            alert("Failed to add post.");
        }
    };

    return (
        <div style={{ marginBottom: "20px", position: "relative" }}>
            {/* Toggle Button */}
            <button 
                onClick={() => setIsFormVisible(!isFormVisible)}
                style={{
                    backgroundColor: "white",
                    color: "#2e7d32",
                    border: "1px solid #2e7d32",
                    padding: "10px 24px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    width: "120px",
                    margin: "0 auto",
                    display: "block"
                }}
            >
                {isFormVisible ? "Close" : "Post"}
            </button>

            {/* Form Container - Conditionally Rendered */}
            {isFormVisible && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "600px",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    marginTop: "10px",
                    zIndex: 100
                }}>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ddd"
                        }}
                    />
                    <textarea 
                        placeholder="Write your post..." 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            minHeight: "100px",
                            resize: "vertical"
                        }}
                    />
                    <input 
                        type="text" 
                        placeholder="Image URL (optional)" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ddd"
                        }}
                    />
                    <button 
                        onClick={addPost}
                        style={{
                            backgroundColor: "#2e7d32",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            width: "100%"
                        }}
                    >
                        Post
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostForm;