import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { Footer } from "@/components/footer/Footer";
import { font } from "@/fonts";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { SessionProvider } from "next-auth/react";
import { Chat } from "@/components/chat/Chat";
import { UserProfilePanel } from "@/components/profile/UserProfilePanel";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";

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
                        className="max-w-6xl mx-auto"
                    >
                        {/* 用户资料面板 */}
                        <div className="mb-8">
                            <UserProfilePanel />
                        </div>

                        {/* 聊天和排行榜并排布局 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 聊天区域 - 占据2/3宽度 */}
                            <div className="md:col-span-1">
                                <Chat />
                            </div>

                            {/* 排行榜区域 - 占据1/3宽度 */}
                            <div className="md:col-span-1">
                                <Leaderboard />
                            </div>
                        </div>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </SessionProvider>
    );
} 