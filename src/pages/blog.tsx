import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { Footer } from "@/components/footer/Footer";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { font } from "@/fonts";

export default function Blog() {
    return (
        <main className={`${font.className} overflow-hidden`}>
            <ExpandableNavBar links={NAV_LINKS} />
            <div className="bg-zinc-50 py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <h1 className="mb-8 text-4xl font-bold md:text-5xl">Our Blog</h1>
                    <p className="mb-12 text-lg text-zinc-600">
                        Explore our latest articles, insights, and updates
                    </p>
                    <BlogGrid />
                </div>
            </div>
            <Footer />
        </main>
    );
} 