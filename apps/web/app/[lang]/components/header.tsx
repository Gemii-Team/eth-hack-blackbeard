"use client";

import React, { useState } from "react";
import {
    Avatar,
    Name,
    Identity,
    Address,
    EthBalance,
} from "@coinbase/onchainkit/identity";
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Moon, Settings, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCapture, Glow } from "@codaworks/react-glow";

interface IHeaderProps {
    toggleTheme: () => void;
    theme: "light" | "dark";
}

const Header = ({ toggleTheme, theme }: IHeaderProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
    return (
        <div>
            <GlowCapture>
                <header className="fixed top-0 w-full z-30 pt-4">
                    <Glow color="bg-slate-200 dark:bg-slate-800">
                        <motion.div
                            className="max-w-4xl mx-auto w-full h-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative backdrop-filter backdrop-blur-lg rounded-2xl opacity-90 shadow-lg ring-1 ring-black/5">
                                <div className="flex justify-end items-center">
                                    <button
                                        onClick={toggleSettings}
                                        className="flex items-center justify-center h-12 w-12 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg shadow-md"
                                    >
                                        <Settings className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                                    </button>

                                    <div className="flex items-end space-x-3">
                                        <Wallet className="p-2">
                                            <ConnectWallet>
                                                <Avatar className="h-8 w-8" />
                                                <Name className="text-sm font-medium text-gray-200 hidden sm:block" />
                                            </ConnectWallet>
                                            <WalletDropdown>
                                                <Identity className="p-4 rounded-lg shadow-lg space-y-2">
                                                    <Avatar />
                                                    <Name className="text-lg font-semibold text-gray-100" />
                                                    <Address className="text-sm text-gray-400" />
                                                    <EthBalance className="text-sm text-gray-200 font-medium" />
                                                </Identity>
                                                <WalletDropdownDisconnect className="text-sm text-gray-400 hover:text-white" />
                                            </WalletDropdown>
                                        </Wallet>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Glow>
                </header>
                {isSettingsOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={toggleSettings}
                    >
                        <div
                            className="relative bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md shadow-lg"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 focus:outline-none"
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
                                        className={`w-16 h-8 flex items-center rounded-full p-1 transition ${theme === "dark" ? "bg-primary-light" : "bg-primary-dark"
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition ${theme === "dark" ? "translate-x-8" : "translate-x-0"
                                                }`}
                                        >
                                            {theme === "dark" ? (
                                                <Moon className="h-4 w-4 text-primary-dark" />
                                            ) : (
                                                <Sun className="h-4 w-4 text-primary-light" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={toggleSettings}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-slate-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </GlowCapture>

        </div>
    );
};

export default Header;