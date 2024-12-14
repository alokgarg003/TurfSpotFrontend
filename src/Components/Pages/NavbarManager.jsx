// import React from 'react'
// import {Link} from 'react-router-dom';
// import { LogoutAction } from '../../Redux/Action/LogoutAction';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';


// function NavbarManager() {
    
//     const dispatch = useDispatch();
//     const history = useHistory()
//     const Logout = () => {
//       dispatch(LogoutAction());
//          localStorage.removeItem("user");
//       history.push("/");
//     }
    
//     return (
//         <div>
            
//             <React.Fragment>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <ul className="navbar-nav">
                  
//                     <li className="nav-item dropdown ">
//                         <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                             Turf
//                         </a>
//                         <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
//                             <li className="nav-item">
//                                 <Link className="dropdown-item text-white" to="/addturf">Add Turf</Link>
//                             </li>
//                              <li className="nav-item">
//                                 <Link className="dropdown-item text-white" to="/viewturf">Turf List</Link>
//                             </li>
//                         </div>

//                     </li>

//                     {/* <li className="nav-item">
//                         <Link className="nav-link" to="/bookinghistory">View Booking</Link>
//                     </li> */}
                   
//                     <li className="nav-item">
//                         <Link className="nav-link"   onClick={Logout}>Logout </Link>
//                     </li>
//                 </ul>
//             </nav>
//             </React.Fragment>
//         </div>
//     )
// }

// export default NavbarManager



// src/Components/Pages/NavbarManager.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { LogoutAction } from '../../Redux/Action/LogoutAction';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  SportsFootball,
  Add as AddIcon,
  ViewList,
  Logout,
  Person,
  BookOnline,
  Dashboard,
  Payment,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '& .logo-icon': {
      animation: `${rotate} 2s linear infinite, ${bounce} 1s ease infinite`,
    },
    '& .logo-text': {
      transform: 'scale(1.05)',
      textShadow: '0 0 10px rgba(255,255,255,0.5)',
    },
  },
}));

const LogoIcon = styled(SportsFootball)(({ theme }) => ({
  fontSize: 40,
  color: '#fff',
  transition: 'all 0.3s ease',
  filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: '#fff',
  fontSize: '1.8rem',
  letterSpacing: '1px',
  transition: 'all 0.3s ease',
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  fontFamily: "'Poppins', sans-serif",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

const NavbarManager = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [turfMenuAnchor, setTurfMenuAnchor] = useState(null);

  const handleLogout = () => {
    try {
      dispatch(LogoutAction());
      localStorage.removeItem("user");
      history.push("/");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleTurfMenuOpen = (event) => {
    setTurfMenuAnchor(event.currentTarget);
  };

  const handleTurfMenuClose = () => {
    setTurfMenuAnchor(null);
  };

  const navItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/manager/dashboard',
      description: 'Overview of turf management',
    },
    {
      text: 'Add Turf',
      icon: <AddIcon />,
      path: '/addturf',
      description: 'Add a new turf',
    },
    {
      text: 'View Turfs',
      icon: <ViewList />,
      path: '/viewturf',
      description: 'Manage existing turfs',
      badge: 3, // Optional: Show number of active turfs
    },
    {
      text: 'Bookings',
      icon: <BookOnline />,
      path: '/viewbookingbymanager',
      description: 'View all bookings',
      badge: 5, // Optional: Show number of new bookings
    },
    {
      text: 'Payments',
      icon: <Payment />,
      path: '/payments',
      description: 'View payment history',
    },
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <LogoContainer sx={{ px: 2, mb: 3 }}>
        <LogoIcon className="logo-icon" sx={{ color: '#1a237e' }} />
        <LogoText className="logo-text" sx={{ color: '#1a237e' }}>
          Turf<span style={{ color: '#4CAF50' }}>Spot</span>
        </LogoText>
      </LogoContainer>

      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(26, 35, 126, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#1a237e' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={item.description}
            />
            {item.badge && (
              <Badge badgeContent={item.badge} color="error" />
            )}
          </ListItem>
        ))}

        <ListItem
          button
          onClick={handleLogout}
          sx={{
            my: 0.5,
            mx: 1,
            borderRadius: 2,
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#d32f2f' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <LogoContainer component={Link} to="/manager/dashboard">
              <LogoIcon className="logo-icon" />
              <LogoText className="logo-text">
                Turf<span style={{ color: '#4CAF50' }}>Spot</span>
              </LogoText>
            </LogoContainer>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                {navItems.map((item) => (
                  <Tooltip 
                    key={item.text} 
                    title={item.description}
                    arrow
                  >
                    <NavButton
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                    >
                      {item.text}
                      {item.badge && (
                        <Badge 
                          badgeContent={item.badge} 
                          color="error" 
                          sx={{ ml: 1 }}
                        />
                      )}
                    </NavButton>
                  </Tooltip>
                ))}

                <Tooltip title="Logout">
                  <NavButton
                    onClick={handleLogout}
                    startIcon={<Logout />}
                    sx={{
                      color: '#ffcdd2',
                      ml: 2,
                    }}
                  >
                    Logout
                  </NavButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            borderRadius: '0 20px 20px 0',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </Box>
  );
};

export default NavbarManager;