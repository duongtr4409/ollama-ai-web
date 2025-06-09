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
        const { messages, apiKey } = get();
        
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
          // Choose AI provider based on available configuration
          let response;
          if (apiKey && apiKey.startsWith('sk-')) {
            response = await get().sendToOpenAI(content, messages);
          } else {
            response = await get().sendToOllama(content, messages);
          }

          // Add assistant message
          const assistantMessage = {
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, { ...assistantMessage, id: Date.now() + 1 }],
            isLoading: false,
          }));
        } catch (error) {
          console.error('Error sending message:', error);
          set({
            error: error.message || 'Failed to send message',
            isLoading: false,
          });
        }
      },

      // OpenAI Integration
      sendToOpenAI: async (content, previousMessages) => {
        const { apiKey } = get();
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              ...previousMessages.slice(-10), // Keep last 10 messages for context
              { role: 'user', content },
            ],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
      },

      // Ollama Integration (Local LLM)
      sendToOllama: async (content, previousMessages) => {
        try {
          const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama2', // or any other model you have installed
              prompt: content,
              stream: false,
            }),
          });

          if (!response.ok) {
            throw new Error('Ollama service not available. Please ensure Ollama is running.');
          }

          const data = await response.json();
          return data.response;
        } catch (error) {
          // Fallback to mock response if Ollama is not available
          return get().getMockResponse(content);
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