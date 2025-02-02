import React from "react";
import { motion } from "framer-motion";
import { Bot, ArrowLeftRight, File, Info } from "lucide-react";

interface ISidebarProps {
    screenWidth: number;
    isMobileSidebarOpen: boolean;
    isExpanded: boolean;
}

export const NavItems = ({
    screenWidth,
    isMobileSidebarOpen,
    isExpanded,
}: ISidebarProps) => {
    const SidebarItem = ({
        icon: Icon,
        label,
        onClick,
    }: {
        icon: React.ElementType;
        label: string;
        onClick?: () => void;
    }) => {
        const showLabel =
            (isExpanded && screenWidth >= 768) ||
            (isMobileSidebarOpen && screenWidth < 768);

        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center ${isExpanded || isMobileSidebarOpen
                        ? "w-full h-12 p-2"
                        : "w-full h-12"
                    } text-background hover:text-primary rounded-lg cursor-pointer group transition-all duration-300`}
                onClick={onClick}
            >
                <Icon className="h-6 w-6" />
                {showLabel && (
                    <span className="ml-4 text-sm font-medium group-hover:text-primary-light">
                        {label}
                    </span>
                )}
            </motion.div>
        );
    };

    return (
        <>
            <nav className="flex flex-col space-y-4 flex-grow px-4">
                <SidebarItem icon={File} label="Docs" onClick={() => { }} />
                <SidebarItem icon={ArrowLeftRight} label="Swap" onClick={() => { }} />
                <SidebarItem icon={Bot} label="Chat" onClick={() => { }} />
            </nav>
            <div className="mb-4 px-4">
                <SidebarItem icon={Info} label="Help" onClick={() => { }} />
            </div>
        </>
    );
};