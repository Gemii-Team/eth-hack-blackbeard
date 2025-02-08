// src/store/chatStore.ts
import { create } from 'zustand';
import axios from 'axios';
// Type for each chat message
export type ChatMessage = {
    sender: 'user' | 'ai';  // Sender can be 'user' or 'ai'
    message: string;        // The actual message text
};

// Type for the store state
export interface ChatStore {
    chatHistory: ChatMessage[];            // Array of chat messages
    isLoading: boolean;                    // Flag to check if the API call is loading
    fetchChatResponse: (userMessage: string) => Promise<void>;  // Function to send user input and get AI response
    resetChatHistory: () => void;          // Function to reset the chat history
}

interface ResponseData {
    responses: string[];
}

const useChatStore = create<ChatStore>((set) => ({
    chatHistory: [],
    isLoading: false,

    fetchChatResponse: async (userMessage: string) => {
        set({ isLoading: true });

        try {
            set((state) => ({
                chatHistory: [...state.chatHistory, { sender: 'user', message: userMessage }],
            }));

            const response = await axios.post<ResponseData>(
                'https://1zc54s96-8000.asse.devtunnels.ms/process_input', {
                user_input: userMessage,
            });
            const data = response.data.responses || '';
            const foramtedData = data[data.length - 1] || '';
            set((state) => ({
                chatHistory: [...state.chatHistory, { sender: 'ai', message: foramtedData}],
            }));
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    // Reset chat history (optional)
    resetChatHistory: () => set({ chatHistory: [] }),
}));

export default useChatStore;
