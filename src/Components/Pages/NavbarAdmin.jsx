// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { NavLink } from 'react-router-dom';
// import {Link} from 'react-router-dom';
// import { LogoutAction } from '../../Redux/Action/LogoutAction'

// function NavbarAdmin() {
    
//     const dispatch = useDispatch();
//     const history = useHistory()
//     const Logout = () => {
//       dispatch(LogoutAction());
//       history.push("/");
//     }

//     return (
//         <div>
            
//             <React.Fragment>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <ul className="navbar-nav">
                   

//                     <li className="nav-item">
//                         <Link className="nav-link" to="/profile/userlist">User </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/admin/managerlist">Manager </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/turflist">Turfs </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" onClick={Logout}>Logout </Link>
//                     </li>
                  
                  
                   
//                 </ul>
//             </nav>
//             </React.Fragment>
//         </div>
//     )
// }

// export default NavbarAdmin

// src/Components/Pages/NavbarAdmin.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { LogoutAction } from '../../Redux/Action/LogoutAction';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  SportsFootball,
  People,
  SupervisorAccount,
  Logout,
  Dashboard,
  SportsSoccer,
  BookOnline,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components with animations preserved from original
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  fontSize: '0.9rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
}));

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(LogoutAction());
    history.push("/");
  };

  const navItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/profile/admin',
    },
    {
      text: 'Users',
      icon: <People />,
      path: '/profile/userlist',
    },
    {
      text: 'Managers',
      icon: <SupervisorAccount />,
      path: '/admin/managerlist',
    },
    {
      text: 'Turfs',
      icon: <SportsSoccer />,
      path: '/turflist',
    },
    {
      text: 'Bookings',
      icon: <BookOnline />,
      path: '/admin/bookings',
    },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SportsFootball sx={{ fontSize: 32, mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/admin/dashboard"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              TurfSpot Admin
            </Typography>
          </Box>

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop navigation buttons aligned to the right */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
              <NavButton
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{
                  ml: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                Logout
              </NavButton>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </Box>
  );
};

export default NavbarAdmin;














