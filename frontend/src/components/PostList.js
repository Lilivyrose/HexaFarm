import PostItem from "./PostItem";

const PostList = ({ posts, fetchPosts }) => {
    return (
        <ul>
            {posts.length === 0 ? (
                <p>No posts available. Be the first to post!</p>
            ) : (
                posts.map((post) => (
                    <PostItem key={post.id} post={post} fetchPosts={fetchPosts} />
                ))
            )}
        </ul>
    );
};

export default PostList;
