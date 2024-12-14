// import React, { useEffect, useState } from 'react';

// import { useSelector } from 'react-redux';
// import NavbarManager from './NavbarManager';
// import ControlledCarousel from '../Frontpages/HomePages/Coursel';

// function ProfileManager(props) {

//    const {userSignIn} = useSelector(state => state.loginState)

//     return (
//         <div>
//             {userSignIn?(
//                 <React.Fragment>       
//                 <NavbarManager/>
//                 <div style={{marginTop:40}}>
//                     <ControlledCarousel/>
//                 </div>
//             </React.Fragment>):(
//                 <React.Fragment>
//                     {props.history.push("/login")}
//                 </React.Fragment>
//             )}
//         </div>
//     )
// }

// export default ProfileManager


import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarManager from './NavbarManager';
import ControlledCarousel from '../Frontpages/HomePages/Coursel';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  ViewList,
  History,
  TrendingUp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
}));

const WelcomeBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const CarouselWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(4),
  '& .carousel': {
    borderRadius: theme.spacing(2),
  },
}));

function ProfileManager() {
  const { userSignIn, loading } = useSelector(state => state.loginState);

  if (loading) {
    return (
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <CircularProgress sx={{ color: '#2E7D32' }} />
      </Box>
    );
  }

  if (!userSignIn) {
    return <Redirect to="/login" />;
  }

  const quickActions = [
    {
      title: 'Add New Turf',
      description: 'Register a new turf facility',
      icon: <AddIcon sx={{ fontSize: 40, color: '#2E7D32' }} />,
      path: '/addturf',
    },
    {
      title: 'View Turfs',
      description: 'Manage existing turf facilities',
      icon: <ViewList sx={{ fontSize: 40, color: '#2E7D32' }} />,
      path: '/viewturf',
    },
    {
      title: 'Booking History',
      description: 'View and manage bookings',
      icon: <History sx={{ fontSize: 40, color: '#2E7D32' }} />,
      path: '/bookinghistory',
    },
    {
      title: 'Analytics',
      description: 'View turf performance metrics',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#2E7D32' }} />,
      path: '/analytics',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <NavbarManager />
      
      <StyledContainer maxWidth="lg">
        <WelcomeBanner elevation={0}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Welcome to Manager Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Manage your turf facilities and bookings efficiently
          </Typography>
        </WelcomeBanner>

        <CarouselWrapper>
          <ControlledCarousel />
        </CarouselWrapper>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2E7D32' }}>
          Quick Actions
        </Typography>

        <Grid container spacing={3}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.title}>
              <QuickActionCard>
                <IconButton sx={{ mb: 2, bgcolor: 'rgba(46, 125, 50, 0.1)', p: 2 }}>
                  {action.icon}
                </IconButton>
                <Typography variant="h6" gutterBottom align="center">
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {action.description}
                </Typography>
              </QuickActionCard>
            </Grid>
          ))}
        </Grid>

        {/* Add more dashboard components here */}
        <Box sx={{ mt: 4 }}>
          {/* Additional components like statistics or recent bookings could go here */}
        </Box>
      </StyledContainer>
    </Box>
  );
}

export default ProfileManager;