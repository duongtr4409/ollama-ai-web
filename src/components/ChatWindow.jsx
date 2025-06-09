import React, { useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Fade,
  useTheme,
} from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import Message from './Message';
import useChatStore from '../stores/chatStore';

const ChatWindow = () => {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const LoadingIndicator = () => (
    <Fade in={isLoading}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 2,
            backgroundColor: theme.palette.message.assistant.background,
            borderRadius: '18px 18px 18px 4px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -8,
              bottom: 8,
              width: 0,
              height: 0,
              border: '8px solid transparent',
              borderRightColor: theme.palette.message.assistant.background,
            },
          }}
        >
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            AI is thinking...
          </Typography>
        </Box>
      </Box>
    </Fade>
  );

  const EmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        p: 4,
      }}
    >
      <SmartToy
        sx={{
          fontSize: 64,
          color: theme.palette.primary.main,
          mb: 2,
          opacity: 0.7,
        }}
      />
      <Typography variant="h5" gutterBottom color="text.primary">
        Welcome to AI ChatBot
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Start a conversation by typing a message below.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        I support Markdown formatting and code syntax highlighting!
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={2}
      sx={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.chat,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: theme.palette.text.secondary,
            },
          },
        }}
      >
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <Box sx={{ py: 2 }}>
            {messages.map((message, index) => (
              <Message key={message.id || index} message={message} index={index} />
            ))}
            {isLoading && <LoadingIndicator />}
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
    </Paper>
  );
};

export default ChatWindow;