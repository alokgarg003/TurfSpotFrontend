// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function NavBar() {

//     const { userSignIn } = useSelector(state => state.loginState)

//     return (
//         <div>
//             {!userSignIn ? (
//                 <React.Fragment>
//                     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                         <ul className="navbar-nav">
                            
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/">Home</Link>
//                             </li>

//                             <li className="nav-item dropdown bg-dark">
//                                 <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                     Register
//                                 </a>
//                                 <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
//                                     <li className="nav-item">
//                                         <Link className="dropdown-item text-white" to="/userregister">User</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="dropdown-item text-white" to="/managerregister">Manager</Link>
//                                     </li>
//                                 </div>
//                             </li>
                          
//                             <li className="nav-item dropdown bg-dark">
//                                 <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                     Login
//                                 </a>
//                                 <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
//                                     <li className="nav-item">
//                                         <Link className="dropdown-item text-white" to="/loginuser">User</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="dropdown-item text-white" to="/loginmanager">Manager</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="dropdown-item text-white" to="/loginadmin">Admin</Link>
//                                     </li>
//                                 </div>
//                             </li>

//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/about">About</Link>
//                             </li>

//                             {/* <li className="nav-item">
//                                 <Link className="nav-link" to="/feedback">Feedback</Link>
//                             </li> */}
                            
//                         </ul>

//                         <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
//                             <ul class="navbar-nav ml-auto">                                                    
//                                 <li class="nav-item">
//                                     <a class="nav-link" href="/" style={{ fontSize: 30, fontFamily: '-moz-initial' }}><b>Turf Managemenent By Alok</b></a>
//                                 </li>
//                             </ul>
//                         </div>

//                     </nav>
//                 </React.Fragment>) : (<React.Fragment></React.Fragment>)}
//         </div>
//     )
// }



// src/Components/Pages/NavBar.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  SportsFootball,
  Home,
  Person,
  PersonAdd,
  Login,
  Info,
  AdminPanelSettings,
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

const NavBar = () => {
  const { userSignIn } = useSelector(state => state.loginState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registerMenu, setRegisterMenu] = useState(null);
  const [loginMenu, setLoginMenu] = useState(null);

  const handleRegisterMenu = (event) => {
    setRegisterMenu(event.currentTarget);
  };

  const handleLoginMenu = (event) => {
    setLoginMenu(event.currentTarget);
  };

  const navItems = [
    {
      text: 'Home',
      icon: <Home />,
      path: '/',
    },
    {
      text: 'About',
      icon: <Info />,
      path: '/about',
    },
  ];

  const registerItems = [
    {
      text: 'User Registration',
      icon: <Person />,
      path: '/userregister',
    },
    {
      text: 'Manager Registration',
      icon: <AdminPanelSettings />,
      path: '/managerregister',
    },
  ];

  const loginItems = [
    {
      text: 'User Login',
      icon: <Person />,
      path: '/loginuser',
    },
    {
      text: 'Manager Login',
      icon: <AdminPanelSettings />,
      path: '/loginmanager',
    },
    {
      text: 'Admin Login',
      icon: <AdminPanelSettings />,
      path: '/loginadmin',
    },
  ];

  if (userSignIn) {
    return null;
  }

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

            <LogoContainer component={Link} to="/">
              <LogoIcon className="logo-icon" />
              <LogoText className="logo-text">
                Turf<span style={{ color: '#4CAF50' }}>Spot</span>
              </LogoText>
            </LogoContainer>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
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

                <Tooltip title="Register">
                  <NavButton
                    onClick={handleRegisterMenu}
                    startIcon={<PersonAdd />}
                  >
                    Register
                  </NavButton>
                </Tooltip>

                <Tooltip title="Login">
                  <NavButton
                    onClick={handleLoginMenu}
                    startIcon={<Login />}
                  >
                    Login
                  </NavButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Register Menu */}
      <Menu
        anchorEl={registerMenu}
        open={Boolean(registerMenu)}
        onClose={() => setRegisterMenu(null)}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
          },
        }}
      >
        {registerItems.map((item) => (
          <MenuItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setRegisterMenu(null)}
            sx={{
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(26, 35, 126, 0.08)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>

      {/* Login Menu */}
      <Menu
        anchorEl={loginMenu}
        open={Boolean(loginMenu)}
        onClose={() => setLoginMenu(null)}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
          },
        }}
      >
        {loginItems.map((item) => (
          <MenuItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setLoginMenu(null)}
            sx={{
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(26, 35, 126, 0.08)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Drawer */}
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
        <Box sx={{ width: 280, pt: 2 }}>
          <LogoContainer sx={{ px: 2, mb: 3 }}>
            <LogoIcon className="logo-icon" sx={{ color: '#1a237e' }} />
            <LogoText className="logo-text" sx={{ color: '#1a237e' }}>
              Turf<span style={{ color: '#4CAF50' }}>Spot</span>
            </LogoText>
          </LogoContainer>

          <List>
            {[...navItems, ...registerItems, ...loginItems].map((item) => (
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
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </Box>
  );
};

export default NavBar;