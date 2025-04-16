import React, { useState } from "react";

interface BlogFilterProps {
    onFilterChange: (id: number) => void;
}

export const BlogFilter = ({ onFilterChange }: BlogFilterProps) => {
    const [selected, setSelected] = useState(1);

    const handleFilterChange = (id: number) => {
        setSelected(id);
        onFilterChange(id);
    };

    return (
        <div className="bg-zinc-50">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-8 py-6 lg:grid-cols-4">
                {TAB_DATA.map((t) => (
                    <ToggleButton
                        key={t.id}
                        id={t.id}
                        selected={selected}
                        setSelected={handleFilterChange}
                    >
                        {t.title}
                    </ToggleButton>
                ))}
            </div>
        </div>
    );
};

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