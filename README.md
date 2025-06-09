# AI ChatBot Application

A modern, full-featured ChatBot application built with React, Material-UI, and Zustand. Supports both OpenAI API and local LLM integration via Ollama.

## 🚀 Features

- **Modern UI/UX**: Built with Material-UI v5 with custom theming
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **AI Integration**: Support for both OpenAI API and local Ollama models
- **Real-time Chat**: Smooth animations and loading states
- **Responsive Design**: Works perfectly on mobile and desktop
- **Local Storage**: Chat history persistence
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Performance Optimized**: Code splitting and bundle optimization

## 🛠️ Tech Stack

- **Frontend**: React 18 + JavaScript (ES6+)
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Styling**: Emotion (CSS-in-JS)
- **Markdown**: react-markdown + react-syntax-highlighter
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatWindow.jsx      # Main chat display area
│   ├── Message.jsx         # Individual message component
│   ├── InputArea.jsx       # Message input with send button
│   ├── Header.jsx          # App header with controls
│   ├── Settings.jsx        # Settings dialog
│   └── ErrorBoundary.jsx   # Error handling component
├── stores/
│   └── chatStore.js        # Zustand store for state management
├── styles/
│   └── theme.js            # Material-UI theme configuration
├── tests/
│   ├── setup.js            # Test setup
│   └── App.test.jsx        # Basic tests
└── App.jsx                 # Main application component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to `http://localhost:3000`

## 🤖 AI Configuration

### Option 1: OpenAI API (Recommended)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click the Settings icon in the app header
3. Enter your API key (starts with `sk-`)
4. Save settings

### Option 2: Local LLM with Ollama

1. **Install Ollama**:
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows: Download from https://ollama.ai/download
```

2. **Pull a model**:
```bash
ollama pull llama2
# or
ollama pull codellama
ollama pull mistral
```

3. **Start Ollama service**:
```bash
ollama serve
```

4. The app will automatically detect and use Ollama when no OpenAI key is configured

### Option 3: Demo Mode

If neither OpenAI nor Ollama is configured, the app will use mock responses for demonstration purposes.

## 🎨 Customization

### Theme Customization

Edit `src/styles/theme.js` to customize colors, typography, and component styles:

```javascript
const getTheme = (mode) => createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
    // ... other customizations
  },
});
```

### Adding New AI Providers

Extend the `chatStore.js` to add new AI providers:

```javascript
// Add new method to chatStore
sendToCustomAI: async (content, previousMessages) => {
  // Your custom AI integration
},
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run linting
npm run lint
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 📱 Mobile Support

The application is fully responsive and includes:
- Touch-friendly interface
- Optimized layouts for small screens
- Swipe gestures support
- Mobile-first design principles

## 🔧 Advanced Features

### Streaming Responses (OpenAI)

The app supports streaming responses from OpenAI. To enable:

```javascript
// In chatStore.js, modify sendToOpenAI method
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  // ... other options
  body: JSON.stringify({
    // ... other params
    stream: true,
  }),
});

// Handle streaming response
const reader = response.body.getReader();
// Process chunks...
```

### Custom Message Types

Extend the Message component to support different message types:

```javascript
// In Message.jsx
const MessageTypes = {
  text: TextMessage,
  image: ImageMessage,
  file: FileMessage,
};
```

### Plugin System

Add plugins for extended functionality:

```javascript
// Example: Code execution plugin
const CodeExecutionPlugin = {
  name: 'code-execution',
  execute: (code, language) => {
    // Execute code safely
  },
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**:
   - Ensure Ollama is running: `ollama serve`
   - Check if port 11434 is available
   - Verify model is installed: `ollama list`

2. **OpenAI API Errors**:
   - Verify API key is correct
   - Check API quota and billing
   - Ensure network connectivity

3. **Build Issues**:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Vite cache: `npx vite --force`

### Performance Optimization

1. **Bundle Analysis**:
```bash
npm run build
npx vite-bundle-analyzer dist
```

2. **Memory Usage**:
   - Limit message history in store
   - Implement message pagination
   - Use React.memo for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [Zustand](https://github.com/pmndrs/zustand) for simple state management
- [Vite](https://vitejs.dev/) for fast development experience
- [OpenAI](https://openai.com/) for AI capabilities
- [Ollama](https://ollama.ai/) for local LLM support

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Join our [Discord community](https://discord.gg/your-invite)

---

**Happy Coding! 🚀**