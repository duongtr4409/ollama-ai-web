import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import { Key, Computer, Cloud } from '@mui/icons-material';
import useChatStore from '../stores/chatStore';

const Settings = ({ open, onClose }) => {
  const { apiKey, setApiKey, darkMode, toggleDarkMode } = useChatStore();
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempApiKey);
    onClose();
  };

  const handleClose = () => {
    setTempApiKey(apiKey);
    onClose();
  };

  const isOpenAIConfigured = apiKey && apiKey.startsWith('sk-');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 1 }}>
          {/* Theme Settings */}
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label="Dark Mode"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* AI Configuration */}
          <Typography variant="h6" gutterBottom>
            AI Configuration
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose your AI provider:
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                icon={<Cloud />}
                label="OpenAI (Cloud)"
                color={isOpenAIConfigured ? 'primary' : 'default'}
                variant={isOpenAIConfigured ? 'filled' : 'outlined'}
              />
              <Chip
                icon={<Computer />}
                label="Ollama (Local)"
                color={!isOpenAIConfigured ? 'primary' : 'default'}
                variant={!isOpenAIConfigured ? 'filled' : 'outlined'}
              />
            </Box>
          </Box>

          <TextField
            fullWidth
            label="OpenAI API Key"
            type="password"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="sk-..."
            helperText="Enter your OpenAI API key to use GPT models"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <Key sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>OpenAI:</strong> Requires API key, uses cloud service
              <br />
              <strong>Ollama:</strong> Free, runs locally (requires Ollama installation)
            </Typography>
          </Alert>

          <Alert severity="warning">
            <Typography variant="body2">
              If neither is configured, the app will use mock responses for demonstration.
            </Typography>
          </Alert>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;