import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi there! I'm here to support you. How are you feeling today?",
      time: 'now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickResponses = [
    { text: "I'm feeling anxious", emoji: '😰' },
    { text: 'I need someone to talk to', emoji: '💭' },
    { text: 'Help me find a therapist', emoji: '🤝' },
    { text: "I'm having a good day", emoji: '😊' },
  ];

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: 'user', content: message, time: 'now' },
    ]);

    setTimeout(() => {
      let botResponse = 'Thank you for sharing. ';
      if (message.toLowerCase().includes('anxious')) {
        botResponse +=
          'I understand anxiety can be overwhelming. Would you like me to guide you through a breathing exercise or connect you with a therapist who specializes in anxiety?';
      } else if (message.toLowerCase().includes('therapist')) {
        botResponse +=
          "I'd be happy to help you find a therapist. Based on your location and preferences, I can recommend some great options. What type of support are you looking for?";
      } else if (message.toLowerCase().includes('good')) {
        botResponse +=
          "That's wonderful to hear! It's great that you're taking time to check in with yourself. Would you like to log this positive mood in your wellness tracker?";
      } else {
        botResponse +=
          "I'm here to listen and support you. Would you like to explore some self-help resources, or would you prefer to connect with one of our licensed therapists?";
      }

      setMessages((prev) => [...prev, { type: 'bot', content: botResponse, time: 'now' }]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickResponse = (response) => {
    handleSendMessage(response);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#9c27b0',
            color: 'white',
            width: 56,
            height: 56,
            boxShadow: 3,
            '&:hover': {
              bgcolor: '#7b1fa2',
            },
          }}
        >
          <MessageIcon />
        </IconButton>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 320,
            maxHeight: 500,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              bgcolor: 'linear-gradient(to right, #ede7f6, #e3f2fd)',
              borderBottom: '1px solid #ccc',
            }}
          >
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  bgcolor: 'linear-gradient(to bottom right, #9c27b0, #2196f3)',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                <FavoriteIcon sx={{ fontSize: 16, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="subtitle2">MindCare Assistant</Typography>
                <Typography variant="caption" color="textSecondary">
                  Always here to help
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setIsOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}
                mb={1}
              >
                <Box
                  sx={{
                    bgcolor: message.type === 'user' ? '#9c27b0' : '#f1f1f1',
                    color: message.type === 'user' ? 'white' : 'black',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="body2">{message.content}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Quick responses */}
          {messages.length === 1 && (
            <Box sx={{ px: 2, pb: 1 }}>
              <Typography variant="caption" color="textSecondary">
                Quick responses:
              </Typography>
              <Grid container spacing={1} mt={0.5}>
                {quickResponses.map((resp, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Button
                      onClick={() => handleQuickResponse(resp.text)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: 12, textTransform: 'none' }}
                    >
                      {resp.emoji} {resp.text}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Input */}
          <Box
            sx={{
              borderTop: '1px solid #ccc',
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={() => handleSendMessage(inputValue)}
              sx={{ bgcolor: '#9c27b0', color: 'white', '&:hover': { bgcolor: '#7b1fa2' } }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="caption" align="center" color="textSecondary" sx={{ p: 1 }}>
            For emergencies, call 988 (Suicide & Crisis Lifeline)
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;
