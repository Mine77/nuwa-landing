import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    coverImage: string;
    content: string;
    tag: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogPosts(): BlogPost[] {
    if (typeof window !== 'undefined') {
        return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(blogDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title,
                date: data.date,
                author: data.author,
                excerpt: data.excerpt,
                coverImage: data.coverImage,
                content,
                tag: data.tag || "Blog",
            };
        });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    if (typeof window !== 'undefined') {
        return null;
    }

    try {
        const fullPath = path.join(blogDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            author: data.author,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            content,
            tag: data.tag || "Blog",
        };
    } catch (error) {
        return null;
    }
}

export function getAllTags(): string[] {
    const posts = getAllBlogPosts();
    const allTags = posts.map(post => post.tag);
    const uniqueTags = Array.from(new Set(allTags));
    return uniqueTags.sort();
} 