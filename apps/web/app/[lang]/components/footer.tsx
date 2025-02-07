import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
    theme?: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
    const isDark = theme === 'dark';

    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full ${isDark ? 'bg-neutral-900/90' : 'bg-white/90'} backdrop-blur-md`}
        >
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Company Name
                        </h3>
                        <p className={`mb-4 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                            Empowering conversations through innovative AI solutions.
                            Building the future of communication, one chat at a time.
                        </p>
                        <div className="flex space-x-4">
                            {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} 
                    transition-colors`}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {['About', 'Features', 'Pricing', 'Blog', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} 
                      transition-colors`}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            {['Documentation', 'API Reference', 'Status', 'Terms of Service', 'Privacy'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} 
                      transition-colors`}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className={`border-t ${isDark ? 'border-neutral-800' : 'border-gray-200'} my-8`} />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                        © {currentYear} Company Name. All rights reserved.
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                        <MessageCircle className={`h-5 w-5 mr-2 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                            Made with
                        </span>
                        <Heart className="h-4 w-4 mx-1 text-red-500" />
                        <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                            by Our Team
                        </span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;