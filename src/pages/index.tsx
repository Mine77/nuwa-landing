import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { Hero } from "@/components/hero/Hero";
import { Logos } from "@/components/logos/Logos";
import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { font } from "@/fonts";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { getAllBlogPosts } from "@/lib/blog";
import { GetStaticProps } from "next";
import { BlogPost } from "@/lib/blog";

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <main className={`${font.className} overflow-hidden`}>
      <ExpandableNavBar links={NAV_LINKS}>
        <Hero />
      </ExpandableNavBar>
      <Logos />
      <div className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32">
        <FeatureToggles />
        <BenefitsGrid />
        <BlogCarousel posts={posts} />
      </div>
      <FinalCTA />
      <Footer />
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllBlogPosts();

  return {
    props: {
      posts,
    },
  };
};
