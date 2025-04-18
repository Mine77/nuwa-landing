import { motion } from "framer-motion";
import { useState } from "react";
import { FiAward } from "react-icons/fi";

interface User {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    points: number;
    rank: number;
}

const userData: User[] = [
    {
        id: 1,
        name: "Andrea Thompson",
        handle: "@andythompson",
        avatar: "/imgs/head-shots/1.jpg",
        points: 1200,
        rank: 1
    },
    {
        id: 2,
        name: "Thomas Smith",
        handle: "@tsmith",
        avatar: "/imgs/head-shots/5.jpg",
        points: 1100,
        rank: 2
    },
    {
        id: 3,
        name: "John Anderson",
        handle: "@johnanderson",
        avatar: "/imgs/head-shots/2.jpg",
        points: 1000,
        rank: 3
    },
    {
        id: 4,
        name: "Craig Peterson",
        handle: "@craigpeterson",
        avatar: "/imgs/head-shots/6.jpg",
        points: 900,
        rank: 4
    },
    {
        id: 5,
        name: "Jen Horowitz",
        handle: "@jenhorowitz",
        avatar: "/imgs/head-shots/3.jpg",
        points: 800,
        rank: 5
    }
];

const TableRows = ({ user }: { user: User }) => {
    return (
        <motion.tr
            layoutId={`row-${user.id}`}
            className={`text-sm ${user.id % 2 ? "bg-slate-100" : "bg-white"}`}
        >
            <td className="p-4">
                <div
                    className={`flex items-center gap-2 font-medium ${user.rank === 1 && "text-violet-500"
                        }`}
                >
                    <span>#{user.rank}</span>
                    {user.rank === 1 && <FiAward className="text-xl" />}
                </div>
            </td>

            <td className="p-4 flex items-center gap-3 overflow-hidden">
                <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-10 h-10 rounded-full bg-slate-300 object-cover object-top shrink-0"
                />
                <div>
                    <span className="block mb-1 font-medium">{user.name}</span>
                    <span className="block text-xs text-slate-500">{user.handle}</span>
                </div>
            </td>

            <td className="p-4 font-medium">{user.points}</td>
        </motion.tr>
    );
};

const Table = () => {
    const [users] = useState<User[]>(userData);

    return (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
                        <th className="text-start p-4 font-medium">Rank</th>
                        <th className="text-start p-4 font-medium">User</th>
                        <th className="text-start p-4 font-medium">Points</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <TableRows key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const Leaderboard = () => {
    return (
        <div className="p-8 w-full">
            <Table />
        </div>
    );
}; 