// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { Link, Redirect, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import RegisterAction from '../../Redux/Action/RegisterAction';
// import axios from 'axios';

// function UserRegistration(props) {

//     const [userState, setuserState] = useState({});
//     const selector = useSelector(state => state.userSignIn);
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const onSubmitHandler = (e) => {
//         e.preventDefault();
//         console.log(userState);
//         localStorage.setItem("registeredUser", JSON.stringify(userState));
//         dispatch(RegisterAction(userState, history));
//         alert("User registered successfully !");
//     }

//     return (

//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-lg-12 form-block px-4">
//                     <div className="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">

//                         <h1 class="display-6 text-center text-white mb-4 mt-4">Create User Account</h1>
//                         <form onSubmit={onSubmitHandler}>
                            
//                             <div className="form-input">
//                                 <span><i className="fas fa-user-alt"></i></span>
//                                 <input type="text" name="" placeholder="First Name" required
//                                     onChange={
//                                         (e) => {
//                                             const firstName = e.target.value;
//                                             setuserState({ ...userState, ...{ firstName } })
//                                         }
//                                     }
//                                 />
//                             </div>

//                             <div className="form-input">
//                                 <span><i className="fas fa-user-alt"></i></span>
//                                 <input type="text" name="" placeholder="Last Name" required
//                                     onChange={
//                                         (e) => {
//                                             const lastName = e.target.value;
//                                             setuserState({ ...userState, ...{ lastName } })
//                                         }
//                                     }
//                                 />
//                             </div>

//                             <div className="form-input">
//                                 <span><i className="fas fa-laptop-code"></i></span>
//                                 <input type="email" name="" placeholder="Email" tabindex="10" required
//                                     onChange={
//                                         (e) => {
//                                             const emailId = e.target.value;
//                                             setuserState({ ...userState, ...{ emailId } })
//                                         }
//                                     }
//                                 />
//                             </div>

//                             <div className="form-input">
//                                 <span><i className="fas fa-tablet-alt"></i></span>
//                                 <input type="text" name="" placeholder="Mobile No." 
//                                 maxLength="10"    required
//                                     onChange={
//                                         (e) => {
//                                             const contactNo = e.target.value;
//                                             setuserState({ ...userState, ...{ contactNo } })
//                                         }
//                                     }
//                                     onClick={(e) => {
//                                         const contactNo = e.target.value;
//                                         if (!(contactNo.length == 10)) {
//                                             alert("Contact number must be of 10 digits");
//                                         }
//                                     }}
//                                 />
//                             </div>

//                             <div className="form-input">
//                                 <span><i className="fa fa-key"></i></span>
//                                 <input type="password" name="" placeholder="Password" required
//                                     onChange={
//                                         (e) => {
//                                             const password = e.target.value;
//                                             setuserState({ ...userState, ...{ password } })
//                                         }
//                                     }
//                                 />
//                             </div>

//                             <div className="mb-3 d-flex align-items-center">
//                                 <div className="custom-control custom-checkbox">
//                                     <input type="checkbox" className="custom-control-input" id="cb1" required />
//                                     <label className="custom-control-label text-white" for="cb1">I agree all terms & conditions</label>
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <button type="submit" className="btn btn-block shadow-lg" /* onClick={onChangeHandler} */>
//                                     Register
//                                 </button>
//                             </div>

//                             <div className="text-center mb-5">
//                                 Already have an account
//                                 <div className="nav-item">
//                                     <Link className="nav-link text-white text-decoration-underline" to="/loginuser">Login</Link>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         </div>

//     )
// }

// export default UserRegistration;


import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterAction from '../../Redux/Action/RegisterAction';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  PersonOutline,
  Email,
  Phone,
  Lock,
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

const RegistrationPaper = styled(Paper)(({ theme }) => ({
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

function UserRegistration() {
  const [userState, setUserState] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    try {
      localStorage.setItem("registeredUser", JSON.stringify(userState));
      await dispatch(RegisterAction(userState, history));
      setShowSuccess(true);
      setTimeout(() => {
        history.push('/loginuser');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlowingBackground>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <RegistrationPaper elevation={0}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Person sx={{ fontSize: 60, color: '#4ECDC4', mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#2a3f54', mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
              Join us to book your favorite turf
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: '#4ECDC4' }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setUserState({ ...userState, firstName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: '#4ECDC4' }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setUserState({ ...userState, lastName: e.target.value })}
              />
            </Box>

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#4ECDC4' }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setUserState({ ...userState, emailId: e.target.value })}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              required
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: '#4ECDC4' }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setUserState({ ...userState, contactNo: e.target.value })}
              onBlur={(e) => {
                if (e.target.value.length !== 10) {
                  alert("Contact number must be 10 digits!");
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#4ECDC4' }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setUserState({ ...userState, password: e.target.value })}
            />

            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  sx={{
                    color: '#4ECDC4',
                    '&.Mui-checked': { color: '#4ECDC4' },
                  }}
                />
              }
              label="I agree to the terms and conditions"
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              disabled={isLoading || !termsAccepted}
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#666' }}>
              Already have an account?{' '}
              <Link to="/loginuser" style={{ color: '#4ECDC4', textDecoration: 'none' }}>
                Login here
              </Link>
            </Typography>
          </form>
        </RegistrationPaper>
      </Container>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={2000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Registration successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </GlowingBackground>
  );
}

export default UserRegistration;