// import React, { useEffect, useState } from 'react';
// import NavBar from './NavbarManager';

// import { useSelector } from 'react-redux';
// import NavbarAdmin from './NavbarAdmin';
// import NavbarUser from './NavbarUser';
// import CardHomePage from '../Frontpages/HomePages/CardHomePage';

// function ProfileUser(props) {

//    const {userSignIn} = useSelector(state => state.loginState)
//     const data=localStorage.getItem("user") ? localStorage.getItem("user") : null


//     return (
//         <div>
            
//         {userSignIn?(
//         <React.Fragment>       
//         <NavbarUser/>
//         <h1 class="display-6 text-left text-white mt-2 ml-5">Welcome...</h1>
//         <div>
//             <CardHomePage/>
//         </div>
        
//         </React.Fragment>):(
//             <React.Fragment>
//                 {props.history.push("/login")}
//             </React.Fragment>
            
//         )}

//         </div>
       
//     )
// }

// export default ProfileUser


import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarUser from './NavbarUser';
import CardHomePage from '../Frontpages/HomePages/CardHomePage';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  IconButton,
} from '@mui/material';
import {
  Search,
  History,
  Favorite,
  SportsFootball,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const WelcomeBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

function ProfileUser() {
  const { userSignIn, loading } = useSelector(state => state.loginState);
  const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userSignIn) {
    return <Redirect to="/login" />;
  }

  const quickActions = [
    {
      title: 'Find Turf',
      icon: <Search sx={{ fontSize: 30, color: '#FF6B6B' }} />,
      path: '/viewturflist'
    },
    {
      title: 'Bookings',
      icon: <History sx={{ fontSize: 30, color: '#FF6B6B' }} />,
      path: '/bookings'
    },
    {
      title: 'Favorites',
      icon: <Favorite sx={{ fontSize: 30, color: '#FF6B6B' }} />,
      path: '/favorites'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <NavbarUser />
      
      <Container sx={{ pt: 4, pb: 4 }}>
        <WelcomeBanner>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SportsFootball sx={{ fontSize: 40 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome{userData?.firstName ? `, ${userData.firstName}!` : '!'}
            </Typography>
          </Box>
        </WelcomeBanner>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={4} key={action.title}>
              <QuickActionCard>
                <IconButton sx={{ mb: 1 }}>
                  {action.icon}
                </IconButton>
                <Typography variant="h6">
                  {action.title}
                </Typography>
              </QuickActionCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
        }}>
          <CardHomePage />
        </Box>
      </Container>
    </Box>
  );
}

export default ProfileUser;