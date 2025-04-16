import { useState } from "react";
import { Post, PostType } from "./Post";
import { posts } from "./BlogCarousel";
import { BlogFilter } from "./BlogFilter";

export const BlogGrid = () => {
    const [filterId, setFilterId] = useState(1);

    const filteredPosts = filterId === 1
        ? posts
        : posts.filter(post => {
            const filterTag = TAB_DATA.find(tab => tab.id === filterId)?.title;
            return post.tag === filterTag;
        });

    return (
        <>
            <BlogFilter onFilterChange={setFilterId} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </>
    );
};

// 与 BlogFilter 组件中的 TAB_DATA 保持一致
const TAB_DATA = [
    {
        id: 1,
        title: "All",
    },
    {
        id: 2,
        title: "Productivity",
    },
    {
        id: 3,
        title: "Marketing",
    },
    {
        id: 4,
        title: "Community",
    },
]; 