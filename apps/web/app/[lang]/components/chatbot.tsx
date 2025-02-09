import React, { ChangeEvent, useCallback, useState } from 'react'
import {
    Search,
    Plus,
    MessageSquare,
    Folder,
    Image,
    PieChart,
} from 'lucide-react'
import { motion } from 'framer-motion'
import useChatStore, { ChatMessage } from '../../store/chat/chatStore'
import { TypeAnimation } from 'react-type-animation'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SpeechToText from './speech-to-text'
interface ChatInterfaceProps {
    theme?: 'light' | 'dark'
    isConnected: boolean
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    node?: any
    inline?: boolean
    className?: string
    children?: React.ReactNode
}


const ChatInterface: React.FC<ChatInterfaceProps> = ({ theme = 'dark', isConnected }) => {
    console.log(isConnected)
    const isDark = theme === 'dark'
    const [input, setInput] = useState<string>('')
    const { chatHistory, fetchChatResponse, isLoading } = useChatStore()

    const handleSubmit = useCallback(async () => {
        if (input.trim() !== '') {
            await fetchChatResponse(input)
            setInput('')
        }
    }, [input, fetchChatResponse])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const containerAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className={`h-screen w-full text-white flex flex-col justify-center items-center text-center`}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerAnimation}
                className={`flex w-full max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden ${isDark ? 'bg-neutral-900/90' : 'bg-white/90'}`}
                style={{ height: '80vh' }}
            >
                {/* Sidebar */}
                <div className={`w-64 ${isDark ? 'bg-neutral-800/90' : 'bg-gray-100/90'} p-4 flex flex-col `}>
                    {/* Search bar */}
                    <div className="relative mb-6">
                        <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDark ? 'text-neutral-400' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search"
                            className={`w-full ${isDark
                                ? 'bg-neutral-700 text-neutral-200 placeholder-neutral-400'
                                : 'bg-white text-gray-800 placeholder-gray-400'
                                } rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c7cfc]`}
                        />
                    </div>

                    {/* Folders section */}
                    <div className="mb-6">
                        <h2 className={`${isDark ? 'text-neutral-400' : 'text-gray-600'} text-sm font-medium mb-2`}>
                            AGENTS
                        </h2>
                        <div className="space-y-1">
                            {['Trumbpet', 'LET ME Cook', 'Trade'].map((folder) => (
                                <button
                                    key={folder}
                                    className={`flex items-center w-full px-3 py-2 ${isDark
                                        ? 'text-neutral-300 hover:bg-neutral-700'
                                        : 'text-gray-700 hover:bg-gray-200'
                                        } rounded-lg transition-colors`}
                                >
                                    <Folder className="h-4 w-4 mr-3" />
                                    <span className="text-sm">{folder}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chats section */}
                    <div className="flex-1">
                        <h2 className={`${isDark ? 'text-neutral-400' : 'text-gray-600'} text-sm font-medium mb-2`}>
                            Chats
                        </h2>
                        <div className="space-y-1">
                            {['New AI chat', 'Meeting notes', 'Project ideas'].map((chat) => (
                                <button
                                    key={chat}
                                    className={`flex items-center w-full px-3 py-2 ${isDark
                                        ? 'text-neutral-300 hover:bg-neutral-700'
                                        : 'text-gray-700 hover:bg-gray-200'
                                        } rounded-lg transition-colors`}
                                >
                                    <MessageSquare className="h-4 w-4 mr-3" />
                                    <span className="text-sm">{chat}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* New Chat Button */}
                    <button className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-[#3c7cfc] hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>New chat</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className={`flex-1 flex flex-col`}>
                    <div className="flex-1 flex flex-col h-full">
                        {/* Dynamic container - centered for empty state, scrollable for chat */}
                        <div
                            className={`flex-1 ${chatHistory.length === 0
                                ? 'flex items-center justify-center'
                                : 'overflow-y-auto'
                                } p-8`}
                        >
                            <div className={`max-w-2xl w-full ${chatHistory.length === 0 ? '' : 'mx-auto'}`}>
                                {isLoading && (
                                    <div className="text-center mb-8">
                                        <p className={`${isDark ? 'text-neutral-400' : 'text-gray-600'} text-sm`}>
                                            <TypeAnimation
                                                sequence={[
                                                    "AI is typing...",
                                                    1000,
                                                    "AI is thinking...",
                                                    1000,
                                                    "AI is processing...",
                                                    1000,
                                                ]}
                                                wrapper="span"
                                                speed={50}
                                                repeat={Infinity}
                                            />
                                        </p>
                                    </div>
                                )}
                                {chatHistory.length > 0 ? (
                                    <div className="space-y-4">
                                        {chatHistory.map((message: ChatMessage, index: number) => (
                                            <div
                                                key={index}
                                                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`p-4 rounded-lg ${message.sender === 'user'
                                                        ? 'bg-[#3c7cfc] text-white'
                                                        : isDark
                                                            ? 'bg-neutral-800 text-neutral-200'
                                                            : 'bg-gray-100 text-gray-800'
                                                        } text-sm max-w-[80%]`}
                                                >
                                                    <Markdown remarkPlugins={[remarkGfm]}>{message.message}</Markdown>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Initial centered content */
                                    <div>
                                        <div className="text-center mb-8">
                                            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                                                How can I help you today?
                                            </h1>
                                            <p className={`${isDark ? 'text-neutral-400' : 'text-gray-600'} text-sm`}>
                                                This tool will display a prompt menu to begin for free, and then it will display a refined message with the tools needed to talk.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            {[
                                                { icon: MessageSquare, label: 'Smart Prompt' },
                                                { icon: Image, label: 'Media Tools' },
                                                { icon: PieChart, label: 'Multi-tool Support' }
                                            ].map((feature) => (
                                                <motion.button
                                                    key={feature.label}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`flex flex-col items-center justify-center p-6 ${isDark
                                                        ? 'bg-neutral-800 hover:bg-neutral-700'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                        } rounded-xl transition-colors cursor-pointer`}
                                                >
                                                    <feature.icon className="h-6 w-6 text-[#3c7cfc] mb-2" />
                                                    <span className={`text-sm ${isDark ? 'text-neutral-200' : 'text-gray-700'}`}>
                                                        {feature.label}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="flex justify-center space-x-6">
                                            {['AI', 'Text', 'Images', 'Video', 'Music', 'Analytics'].map((category) => (
                                                <button
                                                    key={category}
                                                    className={`text-sm ${isDark
                                                        ? 'text-neutral-400 hover:text-neutral-200'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                        } transition-colors cursor-pointer`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input area - always fixed at bottom */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type your prompt here..."
                                        value={input}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className={`w-full ${isDark
                                            ? 'bg-neutral-800 text-neutral-200 placeholder-neutral-400'
                                            : 'bg-white text-gray-800 placeholder-gray-400'
                                            } rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#3c7cfc]`}
                                    />
                                    {/* <SpeechToText /> */}
                                    <button
                                        onClick={handleSubmit}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3c7cfc] hover:text-blue-600 transition-colors cursor-pointer"
                                    >
                                        {isLoading ? 'Loading...' : 'Send'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default ChatInterface