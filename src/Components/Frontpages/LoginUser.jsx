// import React, { useState } from 'react';

// import g1 from '../../images/g1.gif';
// import ForgotPassword from './ForgotPassword'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Redirect, useHistory } from 'react-router-dom';
// import { UserLoginAction } from '../../Redux/Action/UserLoginAction';

// function Loginuser(props) {

//     const history = useHistory();
//     const { userSignIn } = useSelector(state => state.loginState);
//     const [loginState, setloginState] = useState({})
//     const dispatch = useDispatch();

//     const loginClickHandler = (e) => {
//         console.log(loginState)
//         e.preventDefault();
//         dispatch(UserLoginAction(loginState));
//     }

//     return (

//         <div class="container-fluid">
//             {userSignIn ? <Redirect to="/profile/user" /> : ""}
//             <div class="row">
//                 <div class="col-lg-7 form-block px-4">
//                     <div class="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">
//                     <h1 class="display-6 text-center text-white mb-4 mt-4">User Login</h1>
//                         <form>

//                             <div class="form-input">
//                                 <span><i class="fas fa-user-alt"></i></span>
//                                 <input type="text" name="" placeholder="User Email" tabindex="10" required
//                                     onChange={
//                                         (e) => {
//                                             const emailId = e.target.value;
//                                             setloginState({ ...loginState, ...{ emailId } })
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
//                                 <button type="submit" class="btn btn-block shadow-lg" onClick={loginClickHandler}>
//                                     Login
// 							    </button>
//                             </div>

//                             <div class="text-center">
//                                 <div className="nav-item">
//                                     <Link className="nav-link text-white text-decoration-underline" to="/forgotpassword">Forgot Password</Link>
//                                 </div>
//                             </div>

//                             <div class="text-center mb-3">
//                                 or login with
// 						    </div>

//                             <div class="row mb-3">
//                                 <div class="col-4">
//                                     <a href="" class="btn btn-block btn-social btn-facebook shadow-lg">
//                                         <i class="fab fa-facebook"></i>
//                                     </a>
//                                 </div>

//                                 <div class="col-4">
//                                     <a href="" class="btn btn-block btn-social btn-google shadow-lg">
//                                         <i class="fab fa-google"></i>
//                                     </a>
//                                 </div>

//                                 <div class="col-4">
//                                     <a href="" class="btn btn-block btn-social btn-twitter shadow-lg">
//                                         <i class="fab fa-twitter"></i>
//                                     </a>
//                                 </div>
//                             </div>

//                             <div class="text-center mb-5">
//                                 Don't have an account?
//                             <Link className="nav-link text-white text-decoration-underline" to="/userregister">Register here</Link>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//                 <div class="col-lg-5 form-block px-4">
//                     <img src={g1} alt="g1" style={{borderRadius:20}} width="500px" />
//                 </div>

//             </div>
//         </div>


//     )
// }

// export default Loginuser;



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { UserLoginAction } from '../../Redux/Action/UserLoginAction';
import g1 from '../../images/g1.gif';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment,
  Divider,
  IconButton,
} from '@mui/material';
import {
  PersonOutline,
  LockOutlined,
  Facebook,
  Google,
  Twitter,
  Person,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GlowingBackground = styled('div')({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  overflowY: 'auto',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96E6B3)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    zIndex: -1,
  },
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
});

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  margin: '0 8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

function Loginuser() {
  const history = useHistory();
  const { userSignIn } = useSelector(state => state.loginState);
  const [loginState, setLoginState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(UserLoginAction(loginState));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (userSignIn) return <Redirect to="/profile/user" />;

  return (
    <GlowingBackground>
      <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <LoginPaper elevation={0}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Person sx={{ fontSize: 60, color: '#4ECDC4', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#2a3f54', mb: 1 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                  Sign in to access your account and book your favorite turf
                </Typography>
              </Box>

              <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline sx={{ color: '#4ECDC4' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    onChange={(e) => setLoginState({ ...loginState, emailId: e.target.value })}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: '#4ECDC4' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                    onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
                  />

                  <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textAlign: 'right', 
                        mb: 3, 
                        color: '#4ECDC4',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
                      },
                    }}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Or continue with
                    </Typography>
                  </Divider>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <SocialButton color="primary"><Facebook /></SocialButton>
                    <SocialButton sx={{ color: '#db4437' }}><Google /></SocialButton>
                    <SocialButton sx={{ color: '#1DA1F2' }}><Twitter /></SocialButton>
                  </Box>

                  <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                    Don't have an account?{' '}
                    <Link to="/userregister" style={{ textDecoration: 'none', color: '#4ECDC4' }}>
                      Register here
                    </Link>
                  </Typography>
                </form>
              </Box>
            </LoginPaper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ 
              color: 'white', 
              fontWeight: 700, 
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              Book Your Turf
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'white', 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              Find and book the perfect turf for your game
            </Typography>
            <Box
              component="img"
              src={g1}
              alt="Login illustration"
              sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: 4,
                boxShadow: '0 15px 45px rgba(0,0,0,0.2)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(-20px)' },
                  '50%': { transform: 'translateY(0)' },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </GlowingBackground>
  );
}

export default Loginuser;