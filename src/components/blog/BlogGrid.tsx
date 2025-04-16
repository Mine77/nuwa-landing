import { Post } from "./Post";
import { posts } from "./BlogCarousel";

export const BlogGrid = () => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    );
}; 