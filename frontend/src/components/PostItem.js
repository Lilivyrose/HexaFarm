import { useState } from 'react';

const PostItem = ({ post, fetchPosts }) => {
    const [isLiking, setIsLiking] = useState(false);

    const addReaction = async () => {
        if (isLiking) return;
        setIsLiking(true);
        
        try {
            const response = await fetch(
                `http://localhost:3001/community/react/${post.id}`, 
                { method: "POST" }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add reaction");
            }

            fetchPosts();
        } catch (error) {
            console.error("Error reacting to post:", error);
            alert("Failed to like post.");
        } finally {
            setIsLiking(false);
        }
    };

    const getReactionCount = () => {
        if (!post.reactions) return 0;
        if (typeof post.reactions === 'object') {
            return post.reactions.likes || 0;
        }
        return post.reactions;
    };

    const reactionCount = getReactionCount();

    // Format date like "2 hours ago" or "May 15"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
        }
    };

    return (
        <div style={{ 
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto 25px auto',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            {/* Header with profile icon and username */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #efefef'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    overflow: 'hidden'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                <span style={{
                    fontWeight: '600',
                    fontSize: '14px'
                }}>{post.username}</span>
            </div>

            {/* Post image */}
            {post.image_url && (
                <div style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    <img 
                        src={post.image_url} 
                        alt="Post" 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }} 
                    />
                </div>
            )}

            {/* Post content */}
            <div style={{ padding: '0 16px' }}>
                {/* Title (if exists) */}
                {post.title && (
                    <h3 style={{ 
                        margin: '12px 0 8px 0',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>
                        {post.title}
                    </h3>
                )}

                {/* Content */}
                <p style={{ 
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    {post.content}
                </p>
{/* Like button and reactions */}
<div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    borderTop: '1px solid #efefef',
    borderBottom: '1px solid #efefef',
    marginBottom: '8px'
}}>
    <div style={{  // Added wrapper div to prevent layout shift
        display: 'inline-block',
        transformOrigin: 'center'
    }}>
        <button 
            onClick={addReaction}
            disabled={isLiking}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                transform: 'scale(1)',
                transition: 'transform 0.2s ease',
                outline: 'none',
                margin: '0'  // Ensure no extra margin
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={reactionCount > 0 ? "#ed4956" : "none"} 
                stroke={reactionCount > 0 ? "#ed4956" : "#262626"} 
                strokeWidth="2"
                style={{
                    display: 'block'  // Ensures consistent sizing
                }}
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </button>
    </div>
    <span style={{
        marginLeft: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#262626'
    }}>
        {reactionCount} {reactionCount === 1 ? 'like' : 'likes'}
    </span>
</div>

                {/* Timestamp */}
                <div style={{
                    color: '#8e8e8e',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2px',
                    marginBottom: '12px'
                }}>
                    {formatDate(post.date)}
                </div>
            </div>
        </div>
    );
};

export default PostItem;