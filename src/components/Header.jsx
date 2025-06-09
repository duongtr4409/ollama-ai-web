import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  SmartToy,
  Settings as SettingsIcon,
  DeleteOutline,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import useChatStore from '../stores/chatStore';
import Settings from './Settings';

const Header = () => {
  const { messages, clearMessages, darkMode, toggleDarkMode, error, setError } =
    useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const handleClearChat = () => {
    clearMessages();
    setClearDialogOpen(false);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <SmartToy sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI ChatBot
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Toggle theme">
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Clear chat history">
              <span>
                <IconButton
                  color="inherit"
                  onClick={() => setClearDialogOpen(true)}
                  disabled={messages.length === 0}
                >
                  <DeleteOutline />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton
                color="inherit"
                onClick={() => setSettingsOpen(true)}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Settings Dialog */}
      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Clear Chat Confirmation Dialog */}
      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
      >
        <DialogTitle>Clear Chat History</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to clear all chat messages? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearChat} color="error" variant="contained">
            Clear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;