import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Fade,
  useTheme,
} from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ message, index }) => {
  const theme = useTheme();
  const isUser = message.role === 'user';
  const isDark = theme.palette.mode === 'dark';

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={isDark ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1em 0',
            borderRadius: '8px',
            fontSize: '0.875rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code
          className={className}
          style={{
            backgroundColor: isDark ? '#2d2d2d' : '#f5f5f5',
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <Fade in timeout={300 + index * 100}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            maxWidth: '70%',
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: isUser ? 'primary.main' : 'secondary.main',
              width: 32,
              height: 32,
              mt: 0.5,
            }}
          >
            {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
          </Avatar>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: isUser
                ? theme.palette.message.user.background
                : theme.palette.message.assistant.background,
              color: isUser
                ? theme.palette.message.user.text
                : theme.palette.message.assistant.text,
              borderRadius: isUser
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 0,
                height: 0,
                border: '8px solid transparent',
                ...(isUser
                  ? {
                      right: -8,
                      bottom: 8,
                      borderLeftColor: theme.palette.message.user.background,
                    }
                  : {
                      left: -8,
                      bottom: 8,
                      borderRightColor: theme.palette.message.assistant.background,
                    }),
              },
            }}
          >
            <Box>
              {isUser ? (
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                  {message.content}
                </Typography>
              ) : (
                <ReactMarkdown
                  components={MarkdownComponents}
                  sx={{
                    '& p': { margin: 0 },
                    '& pre': { margin: '8px 0' },
                    '& ul, & ol': { paddingLeft: '20px', margin: '8px 0' },
                    '& blockquote': {
                      borderLeft: '4px solid',
                      borderColor: 'divider',
                      paddingLeft: '16px',
                      margin: '8px 0',
                      fontStyle: 'italic',
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </Box>

            {message.timestamp && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: isUser ? 'right' : 'left',
                  mt: 1,
                  opacity: 0.7,
                  fontSize: '0.75rem',
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
};

export default Message;