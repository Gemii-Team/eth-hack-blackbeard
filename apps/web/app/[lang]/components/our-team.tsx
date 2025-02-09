"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

import aiya from "../../../public/team/aiya.jpeg";
import wat from "../../../public/team/wat.png";
import art from "../../../public/team/art.png";
import bohn from "../../../public/team/bohn.png";
import news from "../../../public/team/new.png";

const teamMembers = [
    { name: "Wirachit Panasit", role: "Fullstack Developer", image: art },
    { name: "Watchara Noisriphan", role: "Product Manager", image: wat },
    { name: "Iya Chomchan", role: "Fullstack Developer", image: aiya },
    { name: "Aphisit Sukkwan", role: "Fullstack Developer", image: bohn },
    { name: "Bunthakan Sirikamonthip", role: "Fullstack Developer", image: news }
];

export default function Team({ theme }: { theme: 'light' | 'dark' }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const isDarkMode = theme === 'dark';

    const firstRow = teamMembers.slice(0, 3);
    const secondRow = teamMembers.slice(3);

    return (
        <section className={`relative min-h-screen flex flex-col justify-center items-center p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}>

            {/* Team Section */}
            <div className="w-full max-w-7xl">
                <motion.h2
                    className={`text-4xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Meet Our Team
                </motion.h2>
                <div className="w-full max-w-7xl px-4">
                    {/* First Row - 3 members */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {firstRow.map((member, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex flex-col items-center p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode
                                        ? 'bg-gray-800 hover:bg-gray-700'
                                        : 'bg-white hover:bg-gray-50'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <div className="relative w-32 h-32 mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-full object-cover"
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{
                                            boxShadow: hoveredIndex === index
                                                ? `0 0 0 3px ${isDarkMode ? '#60A5FA' : '#3B82F6'}`
                                                : '0 0 0 2px rgba(156, 163, 175, 0.3)'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                                <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                    {member.name}
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Second Row - 2 members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {secondRow.map((member, index) => (
                            <motion.div
                                key={index + 3}
                                className={`relative flex flex-col items-center p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode
                                        ? 'bg-gray-800 hover:bg-gray-700'
                                        : 'bg-white hover:bg-gray-50'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                onHoverStart={() => setHoveredIndex(index + 3)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <div className="relative w-32 h-32 mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-full object-cover"
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{
                                            boxShadow: hoveredIndex === (index + 3)
                                                ? `0 0 0 3px ${isDarkMode ? '#60A5FA' : '#3B82F6'}`
                                                : '0 0 0 2px rgba(156, 163, 175, 0.3)'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                                <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                    {member.name}
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}