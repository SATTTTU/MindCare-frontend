// Loader.js
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Loader = ({ message = 'Loading...', size = 60 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
    >
      <CircularProgress size={size} />
      <Typography variant="body1" mt={2} color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

