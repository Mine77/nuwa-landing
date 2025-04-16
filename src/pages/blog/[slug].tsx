import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { Footer } from "@/components/footer/Footer";
import { font } from "@/fonts";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface BlogPostPageProps {
    post: {
        slug: string;
        title: string;
        date: string;
        author: string;
        excerpt: string;
        coverImage: string;
        content: any; // MDX content
    };
}

export default function BlogPost({ post }: BlogPostPageProps) {
    return (
        <main className={`${font.className} overflow-hidden`}>
            <ExpandableNavBar links={NAV_LINKS} />
            <article className="bg-zinc-50 py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
                    <p className="mb-8 text-lg text-zinc-500">
                        {new Date(post.date).toLocaleDateString()} • {post.author}
                    </p>
                    <div className="prose prose-lg max-w-none">
                        <MDXRemote {...post.content} />
                    </div>
                </div>
            </article>
            <Footer />
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllBlogPosts();
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            notFound: true,
        };
    }

    // 序列化 MDX 内容
    const mdxSource = await serialize(post.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeRaw, rehypeSanitize],
        },
    });

    return {
        props: {
            post: {
                ...post,
                content: mdxSource,
            },
        },
    };
}; 