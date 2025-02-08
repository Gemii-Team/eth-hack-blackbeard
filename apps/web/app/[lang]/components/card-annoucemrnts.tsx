import React from 'react';

const AnnouncementCard = () => {
    return (
        <div className="relative w-full max-w-4xl mx-auto p-6 rounded-xl shadow-lg
            bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900
            border border-gray-200 dark:border-gray-700
            transition-colors duration-200">
            {/* Logo + Text */}
            <div className="flex flex-col justify-center space-y-3">
                <div className="flex items-center space-x-2">
                    <span className="text-left font-semibold
                        text-gray-900 dark:text-white
                        transition-colors duration-200">
                        BLACKBEARD TEAM.
                    </span>
                </div>

                <h2 className="text-left text-2xl md:text-3xl font-extrabold 
                    text-gray-900 dark:text-white leading-tight
                    transition-colors duration-200">
                    Introducing{" "}
                    <span className="text-yellow-500 dark:text-yellow-300
                        transition-colors duration-200">
                        Version BETA
                    </span>
                </h2>

                <div className="flex gap-3 mt-3">
                    <a
                        href="#"
                        className="px-4 py-2 rounded-lg shadow-md flex items-center gap-2
                            bg-gray-900 text-white dark:bg-white dark:text-purple-700
                            hover:bg-gray-800 dark:hover:bg-gray-200
                            transition-colors duration-200
                            font-semibold"
                    >
                        Read Whitepaper
                        <span role="img" aria-label="link">🔗</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;