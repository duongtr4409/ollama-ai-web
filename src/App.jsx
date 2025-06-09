import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  useMediaQuery,
} from '@mui/material';
import getTheme from './styles/theme';
import useChatStore from './stores/chatStore';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';

function App() {
  const { darkMode } = useChatStore();
  const theme = getTheme(darkMode ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          
          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              py: isMobile ? 1 : 3,
              px: isMobile ? 1 : 3,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxHeight: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 140px)',
              }}
            >
              <ChatWindow />
              <InputArea />
            </Box>
          </Container>

          {/* Footer */}
          <Box
            sx={{
              textAlign: 'center',
              py: 1,
              px: 2,
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              fontSize: '0.75rem',
              color: theme.palette.text.secondary,
            }}
          >
            AI ChatBot - Built with React + Material-UI + Zustand
          </Box>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;