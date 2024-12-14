// import React, { useEffect, useState } from 'react';
// import NavBar from './NavbarManager';

// import { useSelector } from 'react-redux';
// import NavbarAdmin from './NavbarAdmin';
// import ControlledCarousel from '../Frontpages/HomePages/Coursel';

// function ProfileAdmin(props) {

//    const {userSignIn} = useSelector(state => state.loginState)


//     return (
//         <div>
//          {userSignIn?(
//          <React.Fragment>       
//         <NavbarAdmin/>
//         <div style={{marginTop:40}}>
//             <ControlledCarousel/>
//             </div>
//         </React.Fragment>):(
//             <React.Fragment>
//                 {props.history.push("/login")}
//             </React.Fragment>
//         )}

//         </div>
//     )
// }

// export default ProfileAdmin


import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import ControlledCarousel from '../Frontpages/HomePages/Coursel';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  IconButton,
  Chip,
} from '@mui/material';
import {
  People,
  SupervisorAccount,
  SportsFootball,
  Assessment,
  PersonAdd,
  AddBusiness,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
}));

const WelcomeBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const CarouselWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  '& .carousel': {
    borderRadius: theme.spacing(2),
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

function ProfileAdmin() {
  const history = useHistory();
  const { userSignIn, loading } = useSelector(state => state.loginState);

  if (loading) {
    return (
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <CircularProgress sx={{ color: '#1a237e' }} />
      </Box>
    );
  }

  if (!userSignIn) {
    return <Redirect to="/login" />;
  }

  const quickActions = [
    {
      title: 'Add Manager',
      description: 'Register new manager',
      icon: <PersonAdd sx={{ fontSize: 40, color: '#1a237e' }} />,
      path: '/admin/addmanager',
    },
    {
      title: 'Add Turf',
      description: 'Register new turf',
      icon: <AddBusiness sx={{ fontSize: 40, color: '#1a237e' }} />,
      path: '/addturf',
    },
    {
      title: 'View Reports',
      description: 'Analytics & Statistics',
      icon: <Assessment sx={{ fontSize: 40, color: '#1a237e' }} />,
      path: '/admin/reports',
    },
    {
      title: 'Schedules',
      description: 'View all bookings',
      icon: <Schedule sx={{ fontSize: 40, color: '#1a237e' }} />,
      path: '/admin/schedules',
    },
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <People sx={{ fontSize: 40, color: '#1a237e' }} />,
      trend: '+12% this month',
    },
    {
      title: 'Active Managers',
      value: '45',
      icon: <SupervisorAccount sx={{ fontSize: 40, color: '#1a237e' }} />,
      trend: '+3 this week',
    },
    {
      title: 'Total Turfs',
      value: '78',
      icon: <SportsFootball sx={{ fontSize: 40, color: '#1a237e' }} />,
      trend: '+5 this month',
    },
    {
      title: 'Revenue',
      value: '₹1.2M',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#1a237e' }} />,
      trend: '+18% this month',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    }}>
      <NavbarAdmin />
      
      <StyledContainer maxWidth="lg">
        <WelcomeBanner elevation={0}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Manage your turf facilities and users efficiently
          </Typography>
        </WelcomeBanner>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard elevation={0}>
                {stat.icon}
                <Typography variant="h4" sx={{ my: 2, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {stat.title}
                </Typography>
                <Chip 
                  label={stat.trend} 
                  color="primary" 
                  size="small" 
                  variant="outlined"
                />
              </StatCard>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1a237e' }}>
          Quick Actions
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.title}>
              <QuickActionCard onClick={() => history.push(action.path)}>
                <IconButton sx={{ mb: 2, bgcolor: 'rgba(26, 35, 126, 0.1)', p: 2 }}>
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

        <CarouselWrapper>
          <ControlledCarousel />
        </CarouselWrapper>
      </StyledContainer>
    </Box>
  );
}

export default ProfileAdmin;