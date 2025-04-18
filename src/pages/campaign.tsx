import { ExpandableNavBar } from "@/components/navigation/ExpandableNavBar";
import { Footer } from "@/components/footer/Footer";
import { font } from "@/fonts";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/components/navigation/DesktopLinks";
import { SessionProvider, useSession } from "next-auth/react";
import { Chat } from "@/components/chat/Chat";
import { UserProfilePanel } from "@/components/profile/UserProfilePanel";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { FiUser, FiMessageSquare, FiAward, FiGrid } from "react-icons/fi";
import { useState } from "react";
import { IconType } from "react-icons";
import { GridHoverHero } from "@/components/hero/GridHoverHero";
import { GridCards } from "@/components/other-campaign/GridCards";

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

// 卡片组件类型定义
interface CardProps {
    title: string;
    subtitle: string;
    Icon: IconType;
    isActive: boolean;
    onClick: () => void;
}

// 卡片组件
const Card = ({ title, subtitle, Icon, isActive, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={`w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white cursor-pointer ${isActive ? "ring-2 ring-violet-600" : ""
                }`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

            <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
            <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
            <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
                {title}
            </h3>
            <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
                {subtitle}
            </p>
        </div>
    );
};

// 内容组件
const CampaignContent = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const { data: session, status } = useSession();

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        key="profile"
                    >
                        <UserProfilePanel />
                    </motion.div>
                );
            case "chat":
                return (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        key="chat"
                    >
                        <Chat />
                    </motion.div>
                );
            case "leaderboard":
                return (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        key="leaderboard"
                    >
                        <Leaderboard />
                    </motion.div>
                );
            case "other":
                return (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        key="other"
                    >
                        <GridCards />
                    </motion.div>
                );
            default:
                return (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        key="profile-default"
                    >
                        <UserProfilePanel />
                    </motion.div>
                );
        }
    };

    // 如果正在加载，显示加载状态
    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // 如果未登录，显示hero组件
    if (!session) {
        return <GridHoverHero />;
    }

    // 已登录，显示内容区域
    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-6xl mx-auto"
            >
                <div className="mb-8">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                        <Card
                            title="My Profile"
                            subtitle="Manage your profile"
                            Icon={FiUser}
                            isActive={activeTab === "profile"}
                            onClick={() => setActiveTab("profile")}
                        />
                        <Card
                            title="Agent Campaign"
                            subtitle="Chat with the agent"
                            Icon={FiMessageSquare}
                            isActive={activeTab === "chat"}
                            onClick={() => setActiveTab("chat")}
                        />

                        <Card
                            title="Other Campaign"
                            subtitle="Explore other campaigns"
                            Icon={FiGrid}
                            isActive={activeTab === "other"}
                            onClick={() => setActiveTab("other")}
                        />
                        <Card
                            title="Leaderboard"
                            subtitle="View user rankings"
                            Icon={FiAward}
                            isActive={activeTab === "leaderboard"}
                            onClick={() => setActiveTab("leaderboard")}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    {renderContent()}
                </div>
            </motion.div>
        </main>
    );
};

export default function Campaign() {
    return (
        <SessionProvider>
            <div className={`min-h-screen ${font.className}`}>
                <ExpandableNavBar links={NAV_LINKS} />
                <CampaignContent />
                <Footer />
            </div>
        </SessionProvider>
    );
} 