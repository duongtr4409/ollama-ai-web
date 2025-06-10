import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      darkMode: false,
      apiKey: '',

      // Actions
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, { ...message, id: Date.now() }],
        })),

      updateLastMessage: (content) =>
        set((state) => {
          const messages = [...state.messages];
          if (messages.length > 0) {
            messages[messages.length - 1] = {
              ...messages[messages.length - 1],
              content,
            };
          }
          return { messages };
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearMessages: () => set({ messages: [] }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setApiKey: (apiKey) => set({ apiKey }),

      // AI Integration methods
      sendMessage: async (content) => {
        const { messages } = get();
        
        // Add user message
        const userMessage = {
          role: 'user',
          content,
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          messages: [...state.messages, { ...userMessage, id: Date.now() }],
          isLoading: true,
          error: null,
        }));

        try {
          // Call the API endpoint
          const response = await fetch("http://localhost:8081/api/v1/ollama-chat/chat", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: content,
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const responseText = await response.text();

          // Add assistant message
          const assistantMessage = {
            role: 'assistant',
            content: responseText,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, { ...assistantMessage, id: Date.now() + 1 }],
            isLoading: false,
          }));
        } catch (error) {
          console.error('Error sending message:', error);
          set((state) => {
            const assistantMessage = {
              role: 'assistant',
              content: "Sorry, there was an error processing your request. Please try again.",
              timestamp: new Date().toISOString(),
            };

            return {
              messages: [...state.messages, { ...assistantMessage, id: Date.now() + 2 }],
              error: error.message || 'Failed to send message',
              isLoading: false,
            };
          });
        }
      },



      // Mock response for development/fallback
      getMockResponse: (content) => {
        const responses = [
          "I'm a demo AI assistant. Your message was: " + content,
          "This is a mock response. To use real AI, configure OpenAI API key or install Ollama.",
          "Hello! I'm currently running in demo mode. How can I help you today?",
          "I understand you said: '" + content + "'. This is a simulated response.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        darkMode: state.darkMode,
        apiKey: state.apiKey,
      }),
    }
  )
);

export default useChatStore;
