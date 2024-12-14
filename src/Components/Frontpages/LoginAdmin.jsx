// import React, { useState } from 'react';

// import g1 from '../../images/g1.gif';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Redirect, useHistory } from 'react-router-dom';
// import { AdminLoginAction } from '../../Redux/Action/AdminLoginAction';
// function LoginAdmin(props) {

//     const history = useHistory();
//     const { userSignIn } = useSelector(state => state.loginState);
//     const [loginState, setloginState] = useState({})
//     const dispatch = useDispatch();

//     const loginClickHandler = (e) => {
//         console.log(loginState)
//         e.preventDefault();
//         dispatch(AdminLoginAction(loginState));
//     }

//     return (

//         <div class="container-fluid">
//             {userSignIn ? <Redirect to="/profile/admin" /> : ""}
//             <div class="row">
//                 <div class="col-lg-7 form-block px-4">
//                     <div class="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">
                        
//                         <h1 class="display-6 text-center text-white mb-4">Admin Login</h1>
//                         <form>
                            
//                             <div class="form-input">
//                                 <span><i class="fas fa-user-alt"></i></span>
//                                 <input type="text" name="" placeholder="Username" tabindex="10" required
//                                     onChange={
//                                         (e) => {
//                                             const username = e.target.value;
//                                             setloginState({ ...loginState, ...{ username } })
//                                         }
//                                     }
//                                 />
//                             </div>
                            
//                             <div class="form-input">
//                                 <span><i class="fa fa-key"></i></span>
//                                 <input type="password" name="" placeholder="Password" required
//                                     onChange={
//                                         (e) => {
//                                             const password = e.target.value;
//                                             setloginState({ ...loginState, ...{ password } })
//                                         }
//                                     }
//                                 />
//                             </div>

//                             <div class="mb-3">
//                                 <button type="submit" class="btn btn-block shadow-lg mb-4" onClick={loginClickHandler}>
//                                     Login
// 							    </button>
//                             </div>
                         
//                         </form>
//                     </div>
//                 </div>

//                 <div class="col-lg-5 form-block px-4">
//                     <img src={g1} alt="bg1" style={{borderRadius:20}} width="500px" />
//                 </div>
                
//             </div>
//         </div>

//     )
// }

// export default LoginAdmin;

// LoginAdmin.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { AdminLoginAction } from '../../Redux/Action/AdminLoginAction';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  AdminPanelSettings
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import g1 from '../../images/g1.gif';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  animation: `${fadeIn} 0.6s ease-out`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function LoginAdmin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();
  const dispatch = useDispatch();
  const { userSignIn } = useSelector(state => state.loginState);

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const handleChange = (prop) => (event) => {
    setFormState({ ...formState, [prop]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(AdminLoginAction({
        username: formState.username,
        password: formState.password
      }));
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || 'Login failed. Please try again.',
        severity: 'error'
      });
    }
  };

  if (userSignIn) return <Redirect to="/profile/admin" />;

  return (
    <PageWrapper>
      <MainContent>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <LoginCard elevation={3}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <AdminPanelSettings 
                    sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} 
                  />
                  <Typography variant="h4" component="h1" gutterBottom>
                    Admin Login
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Welcome back! Please login to your account.
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <StyledTextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={formState.username}
                    onChange={handleChange('username')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <StyledTextField
                    fullWidth
                    label="Password"
                    type={formState.showPassword ? 'text' : 'password'}
                    value={formState.password}
                    onChange={handleChange('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </form>
              </LoginCard>
            </Grid>

            {!isMobile && (
              <Grid item md={6} sx={{ textAlign: 'center' }}>
                <Box
                  component="img"
                  src={g1}
                  alt="Admin Login"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: theme.spacing(2),
                    boxShadow: '0 15px 45px rgba(0,0,0,0.2)',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(-10px)' },
                      '50%': { transform: 'translateY(10px)' },
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </MainContent>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default LoginAdmin;