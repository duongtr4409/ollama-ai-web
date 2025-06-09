import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Tooltip,
  Fade,
  useTheme,
} from '@mui/material';
import { Send, Stop } from '@mui/icons-material';
import useChatStore from '../stores/chatStore';

const InputArea = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChatStore();
  const inputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    // In a real implementation, you would cancel the ongoing request
    useChatStore.getState().setLoading(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'flex-end',
        }}
      >
        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isLoading
              ? 'AI is thinking...'
              : 'Type your message... (Shift+Enter for new line)'
          }
          disabled={isLoading}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.background.default,
              '&:hover': {
                backgroundColor: theme.palette.background.default,
              },
              '&.Mui-focused': {
                backgroundColor: theme.palette.background.default,
              },
            },
          }}
        />

        <Tooltip title={isLoading ? 'Stop generation' : 'Send message'}>
          <span>
            <IconButton
              type={isLoading ? 'button' : 'submit'}
              onClick={isLoading ? handleStop : undefined}
              disabled={!input.trim() && !isLoading}
              color="primary"
              sx={{
                p: 1.5,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.action.disabled,
                  color: theme.palette.action.disabled,
                },
              }}
            >
              <Fade in={!isLoading} timeout={200}>
                <Send />
              </Fade>
              <Fade in={isLoading} timeout={200}>
                <Stop
                  sx={{
                    position: 'absolute',
                  }}
                />
              </Fade>
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Character count and tips */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          px: 1,
        }}
      >
        <Box
          sx={{
            fontSize: '0.75rem',
            color: theme.palette.text.secondary,
          }}
        >
          {input.length > 0 && `${input.length} characters`}
        </Box>
        <Box
          sx={{
            fontSize: '0.75rem',
            color: theme.palette.text.secondary,
          }}
        >
          Supports Markdown & Code
        </Box>
      </Box>
    </Paper>
  );
};

export default InputArea;