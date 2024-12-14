// src/Components/Logo/TurfSpotLogo.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { SportsSoccer } from '@mui/icons-material';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1),
  '&:hover': {
    '& .ball': {
      animation: `${bounce} 0.5s ease infinite`,
    },
    '& .text': {
      color: '#4CAF50',
    }
  }
}));

const BallIcon = styled(SportsSoccer)(({ theme }) => ({
  fontSize: 40,
  color: '#4CAF50',
  transition: 'transform 0.3s ease',
  '&:hover': {
    animation: `${rotate} 1s ease-in-out`,
  }
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.8rem',
  background: 'linear-gradient(45deg, #1a237e, #4CAF50)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  letterSpacing: '0.1em',
  transition: 'color 0.3s ease',
}));

const TurfSpotLogo = ({ sx }) => {
  return (
    <LogoContainer sx={sx}>
      <BallIcon className="ball" />
      <LogoText className="text" variant="h4">
        Turf<span style={{ color: '#4CAF50' }}>Spot</span>
      </LogoText>
    </LogoContainer>
  );
};

export default TurfSpotLogo;