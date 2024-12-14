// import React from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaHome, FaBars, FaTimes, FaUser, FaSignInAlt, FaInfoCircle } from 'react-icons/fa';

// const styles = {
//     navbar: {
//         boxShadow: '0 2px 4px rgba(0,0,0,.1)'
//     },
//     navLink: {
//         margin: '0 10px',
//         transition: 'color 0.3s ease'
//     },
//     navLinkHover: {
//         '&:hover': {
//             color: '#your-brand-color'  // Replace with your desired color
//         }
//     },
//     navbarBrand: {
//         fontWeight: 'bold',
//         fontSize: '1.5rem'
//     }
// };

// export default function NavBar(props) {
//     const {userSignIn} = useSelector(state => state.loginState)
    
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <div className="container">
//                     <Link className="navbar-brand" to="/">
//                         TurfSpot
//                     </Link>
                    
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
                    
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/">Home</Link>
//                             </li>
                            
//                             {!userSignIn ? (
//                                 <>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/register">Register</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="nav-link" to="/login">Login</Link>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="#logout">Logout</Link>
//                                 </li>
//                             )}
                            
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/token">About Us</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }


// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  InputBase,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications,
  AccountCircle,
  BookOnline,
  EmojiEvents,
  LiveTv,
  Dashboard,
  Settings,
  Logout,
  Login,
  PersonAdd,
  Home,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import TurfSpotLogo from '../Logo/TurfSpotLogo';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #1a237e, #0d47a1)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  borderRadius: 20,
  padding: theme.spacing(0.8, 2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();
  const dispatch = useDispatch();
  const { userSignIn, user } = useSelector(state => state.loginState);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Book Turf', icon: <BookOnline />, path: '/book' },
    { text: 'Tournaments', icon: <EmojiEvents />, path: '/tournaments' },
    { text: 'Live Matches', icon: <LiveTv />, path: '/live' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic
    handleMenuClose();
    history.push('/');
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2 }}>
        <TurfSpotLogo />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <TurfSpotLogo sx={{ display: { xs: 'none', md: 'flex' } }} />
            </Link>

            {!isMobile && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search turfs, events..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            )}

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              {userSignIn ? (
                <>
                  <Tooltip title="Notifications">
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="error">
                        <Notifications />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                      <Avatar alt={user?.name} src={user?.avatar}>
                        {user?.name?.[0] || 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <NavButton
                    component={Link}
                    to="/login"
                    startIcon={<Login />}
                  >
                    Login
                  </NavButton>
                  <NavButton
                    component={Link}
                    to="/register"
                    startIcon={<PersonAdd />}
                    variant="contained"
                    color="secondary"
                  >
                    Register
                  </NavButton>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: '45px' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); history.push('/profile'); }}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); history.push('/dashboard'); }}>
          <ListItemIcon><Dashboard /></ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); history.push('/settings'); }}>
          <ListItemIcon><Settings /></ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Toolbar /> {/* Spacing for fixed AppBar */}
    </>
  );
}

export default Navbar;
