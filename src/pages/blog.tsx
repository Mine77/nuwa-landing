import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { Footer } from "@/components/footer/Footer";
import { font } from "@/fonts";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { useState } from "react";

interface BlogPageProps {
    posts: {
        slug: string;
        title: string;
        date: string;
        author: string;
        excerpt: string;
        coverImage: string;
        tag: string;
    }[];
    tags: string[];
}

// 动态生成标签数据
const generateTabData = (tags: string[]) => {
    return [
        { id: 1, title: "All" },
        ...tags.map((tag, index) => ({ id: index + 2, title: tag }))
    ];
};

export default function Blog({ posts, tags }: BlogPageProps) {
    const [filterId, setFilterId] = useState(1);
    const tabData = generateTabData(tags);

    const filteredPosts = filterId === 1
        ? posts
        : posts.filter(post => {
            const filterTag = tabData.find(tab => tab.id === filterId)?.title;
            return filterTag ? post.tag === filterTag : false;
        });

    return (
        <main className={`${font.className} overflow-hidden`}>
            <ExpandableNavBar links={NAV_LINKS} />
            <div className="bg-zinc-50 py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <h1 className="mb-8 text-4xl font-bold md:text-5xl">Nuwa Blog</h1>
                    <p className="mb-12 text-lg text-zinc-600">
                        Explore our latest articles, insights, and updates
                    </p>

                    {/* 过滤器 */}
                    <div className="mb-8 bg-zinc-50">
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-8 py-6 lg:grid-cols-4">
                            {tabData.map((t) => (
                                <ToggleButton
                                    key={t.id}
                                    id={t.id}
                                    selected={filterId}
                                    setSelected={setFilterId}
                                >
                                    {t.title}
                                </ToggleButton>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group relative cursor-pointer"
                            >
                                <div className="relative mb-3 h-[200px] w-full overflow-hidden rounded-md border-2 border-zinc-900 bg-zinc-300 shadow-[0px_6px_0px_rgb(24,_24,_27)] transition-all hover:translate-y-1.5 hover:shadow-[0px_0px_0px_rgb(24,_24,_27)]">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                </div>
                                <span className="rounded-md border border-zinc-900 bg-white px-1.5 py-1 text-xs">
                                    {post.tag}
                                </span>
                                <h2 className="mt-1.5 text-lg font-medium">{post.title}</h2>
                                <p className="text-sm">{post.excerpt}</p>
                                <p className="mt-2 text-xs text-zinc-500">
                                    {new Date(post.date).toLocaleDateString()} • {post.author}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

// 过滤器按钮组件
interface ToggleButtonProps {
    children: React.ReactNode;
    selected: number;
    setSelected: (id: number) => void;
    id: number;
}

const ToggleButton = ({ children, selected, setSelected, id }: ToggleButtonProps) => {
    return (
        <div
            className={`rounded-lg transition-colors ${selected === id ? "bg-indigo-600" : "bg-zinc-900"
                }`}
        >
            <button
                onClick={() => setSelected(id)}
                className={`w-full origin-top-left rounded-lg border py-3 text-xs font-medium transition-all md:text-base ${selected === id
                    ? "-translate-y-1 border-indigo-600 bg-white text-indigo-600"
                    : "border-zinc-900 bg-white text-zinc-900 hover:-rotate-2"
                    }`}
            >
                {children}
            </button>
        </div>
    );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
    const posts = getAllBlogPosts();
    const tags = getAllTags();

    return {
        props: {
            posts,
            tags,
        },
    };
}; 