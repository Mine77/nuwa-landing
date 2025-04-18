import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { Footer } from "@/components/footer/Footer";
import { font } from "@/fonts";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { TwitterLoginButton } from "@/components/auth/TwitterLoginButton";
import { SessionProvider } from "next-auth/react";

// 定义淡入动画变体
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function Campaign() {
    return (
        <SessionProvider>
            <div className={`min-h-screen ${font.className}`}>
                <ExpandableNavBar links={NAV_LINKS} />

                <main className="container mx-auto px-4 py-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl font-bold mb-8">Explore the Ongoing Campaigns</h1>

                        <div className="flex justify-center mb-8">
                            <TwitterLoginButton />
                        </div>

                    </motion.div>
                </main>

                <Footer />
            </div>
        </SessionProvider>
    );
} 