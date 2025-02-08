"use client";

import React, { useState } from "react";
import { MenuIcon, Moon, Settings, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface IHeaderProps {
    toggleTheme: () => void;
    theme: "light" | "dark";
}

const Header = ({ toggleTheme, theme }: IHeaderProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div>
            <header className="fixed top-0 w-full z-30 py-4 px-6 md:px-12 backdrop-blur-lg bg-neutral-900/90">
                <motion.div
                    className="max-w-7xl mx-auto w-full flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Logo */}
                    <div className="text-3xl font-extrabold text-slate-700 dark:text-slate-200">
                        BLACKBREAD
                    </div>

                    {/* Desktop Navbar */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={toggleSettings}
                            className="p-2 rounded-lg transition cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            <Settings className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                        </button>
                        <ConnectButton />
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg transition cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            ) : (
                                <MenuIcon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            )}
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Settings Overlay */}
            {isSettingsOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={toggleSettings}
                >
                    <motion.div
                        className="relative bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md shadow-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
                            onClick={toggleSettings}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Dark Mode</span>
                                <button
                                    onClick={toggleTheme}
                                    className={`w-16 h-8 flex items-center rounded-full p-1 transition ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition ${theme === "dark" ? "translate-x-8" : "translate-x-0"}`}
                                    >
                                        {theme === "dark" ? (
                                            <Moon className="h-4 w-4 text-blue-800" />
                                        ) : (
                                            <Sun className="h-4 w-4 text-yellow-500" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={toggleSettings}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute top-16 right-0 w-3/4 bg-gray-800 text-white p-6 rounded-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                    >
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={toggleSettings}
                                    className="w-full text-left text-lg"
                                >
                                    Settings
                                </button>
                            </li>
                            <li>
                                <ConnectButton />
                            </li>
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    className="w-full text-left text-lg"
                                >
                                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Header;
