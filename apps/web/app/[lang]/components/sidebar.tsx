"use client";


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowLeftRight, File, Menu, X, Info } from "lucide-react";
import { NavItems } from "./navItems";



interface SidebarProps {
    screenWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ screenWidth }) => {
    const [isExpanded, setIsExpanded] = useState(screenWidth >= 768);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        setIsExpanded(screenWidth >= 768);
        if (screenWidth >= 768) {
            setIsMobileSidebarOpen(false);
        }
    }, [screenWidth]);

    const toggleSidebar = () => {
        if (screenWidth < 768) {
            setIsMobileSidebarOpen(!isMobileSidebarOpen);
        } else {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <>
            <AnimatePresence>
                {screenWidth < 768 && !isMobileSidebarOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="fixed bottom-6 right-6 z-50 bg-primary text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:scale-105 transition-transform duration-300"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={{ width: screenWidth >= 768 ? "64px" : 0 }}
                animate={{
                    width:
                        screenWidth < 768
                            ? isMobileSidebarOpen
                                ? "100%"
                                : 0
                            : isExpanded
                                ? "160px"
                                : "64px",
                }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 z-50 ${screenWidth < 768 ? "h-full" : "h-[96%] top-4 left-4"} 
                bg-foreground shadow-2xl rounded-3xl 
                backdrop-blur-md 
                flex 
                flex-col 
                overflow-hidden`}
            >
                <AnimatePresence>
                    {screenWidth < 768 && isMobileSidebarOpen && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-4 right-4 text-background focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <X className="h-6 w-6" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <div
                    className={`flex items-center ${isExpanded || isMobileSidebarOpen
                        ? "justify-between p-6"
                        : "justify-center p-4"
                        } mb-6`}
                >
                    {(isExpanded || isMobileSidebarOpen) && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-lg text-background"
                        >
                            close
                        </motion.span>
                    )}
                    {screenWidth >= 768 && (
                        <button
                            className="text-background hover:text-primary focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            {isExpanded ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    )}
                </div>

                <NavItems
                    screenWidth={screenWidth}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    isExpanded={isExpanded}
                />
            </motion.div>
        </>
    );
};

export default Sidebar;