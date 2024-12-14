// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import { Link, Redirect, useHistory } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import PaymentAction from "../../Redux/Action/PaymentAction";
// // import axios from "axios";

// // function PaymentForm(props) {
// //   const [userState, setuserState] = useState({
// //     userId: localStorage.getItem("userId"),
// //     turfId: localStorage.getItem("turfId"),
// //     paymentAmount: localStorage.getItem("turfAmount"),
// //     bookingId: localStorage.getItem("bookingId") || Math.floor(Math.random() * 100) + 1
// //   });

// //   // Debug logging
// //   useEffect(() => {
// //     console.log('Payment State:', userState);
// //   }, [userState]);

// //   const dispatch = useDispatch();
// //   const history = useHistory();

// //   const onSubmitHandler = (e) => {
// //     e.preventDefault();
    
// //     // Validate required fields
// //     if (!userState.userId || !userState.turfId || !userState.paymentAmount) {
// //       alert("Missing required payment information!");
// //       return;
// //     }

// //     dispatch(PaymentAction(userState, history));
// //     history.push("/booking");
// //     alert("payment confirm");
// //   };
 
// //   const NumericOnly = (e) => { 
// //     const reg = /^[0-9\b]+$/
// //     let preval = e.target.value
// //     if (e.target.value === '' || reg.test(e.target.value)) return true
// //     else e.target.value = preval.substring(0,(preval.length-1))
// //   }

// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div className="col-lg-12 form-block px-4">
// //           <div className="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">
// //             <h1 className="display-6 text-center text-white mb-4">Payment Details</h1>
            
// //             {/* Debug info - comment out in production */}
// //             <div className="text-white mb-3" style={{fontSize: '12px'}}>
// //               Amount: {userState.paymentAmount}, Booking ID: {userState.bookingId}
// //             </div>

// //             <form onSubmit={onSubmitHandler}>
// //               {/* Rest of the form remains exactly the same... */}
// //               <div className="form-input">
// //                 <span><i className="fa fa-credit-card"></i></span>
// //                 <input
// //                   type="text"
// //                   placeholder="Card Number"
// //                   required
// //                   maxLength="16"
// //                   onChange={NumericOnly}                 
// //                   onBlur={(e) => {
// //                     const cardnumber = e.target.value;
// //                     if (!(cardnumber.length == 16)) {
// //                       alert("Card number must be of 16 digits!");
// //                     }
// //                   }}
// //                 />
// //               </div>

// //               {/* ... rest of the form inputs remain the same ... */}

// //               <div className="mb-3">
// //                 <button type="submit" className="btn btn-block shadow-lg">
// //                   Payment Confirm
// //                 </button>
// //               </div>
// //               <Link className="btn btn-dark mb-4" style={{opacity:0.8}} to="/viewturflist">
// //                 Back
// //               </Link>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PaymentForm;


// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Chip,
//   Snackbar
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import {
//   CreditCard,
//   Lock,
//   EventNote,
//   Person,
//   ArrowBack,
//   Security,
//   Payment as PaymentIcon
// } from '@mui/icons-material';
// import PaymentAction from '../../Redux/Action/PaymentAction';

// // Styled Components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   background: 'rgba(255, 255, 255, 0.95)',
//   backdropFilter: 'blur(10px)',
//   borderRadius: theme.spacing(2),
//   boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
// }));

// const PaymentSummaryCard = styled(Card)(({ theme }) => ({
//   background: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   marginBottom: theme.spacing(3),
// }));

// export default function PaymentForm() {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [formData, setFormData] = useState({
//     userId: localStorage.getItem("userId"),
//     turfId: localStorage.getItem("turfId"),
//     paymentAmount: localStorage.getItem("turfAmount"),
//     bookingId: localStorage.getItem("bookingId") || Math.floor(Math.random() * 100) + 1,
//     cardNumber: '',
//     cardHolder: '',
//     expiryDate: '',
//     cvv: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     switch (name) {
//       case 'cardNumber':
//         formattedValue = value.replace(/\D/g, '').slice(0, 16);
//         break;
//       case 'cardHolder':
//         formattedValue = value.replace(/[^A-Za-z\s]/g, '');
//         break;
//       case 'expiryDate':
//         formattedValue = value
//           .replace(/\D/g, '')
//           .slice(0, 4)
//           .replace(/(\d{2})(\d{2})/, '$1/$2')
//           .slice(0, 5);
//         break;
//       case 'cvv':
//         formattedValue = value.replace(/\D/g, '').slice(0, 4);
//         break;
//       default:
//         break;
//     }

//     setFormData(prev => ({ ...prev, [name]: formattedValue }));
//     validateField(name, formattedValue);
//   };

//   const validateField = (name, value) => {
//     let error = '';
    
//     switch (name) {
//       case 'cardNumber':
//         if (!value) error = 'Card number is required';
//         else if (!/^\d{16}$/.test(value)) error = 'Card number must be 16 digits';
//         break;
//       case 'cardHolder':
//         if (!value) error = 'Cardholder name is required';
//         else if (!/^[A-Za-z\s]{3,}$/.test(value)) error = 'Please enter a valid name';
//         break;
//       case 'expiryDate':
//         if (!value) error = 'Expiry date is required';
//         else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
//           error = 'Invalid format (MM/YY)';
//         } else {
//           const [month, year] = value.split('/');
//           const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
//           if (expiry < new Date()) error = 'Card has expired';
//         }
//         break;
//       case 'cvv':
//         if (!value) error = 'CVV is required';
//         else if (!/^\d{3,4}$/.test(value)) error = 'CVV must be 3 or 4 digits';
//         break;
//       default:
//         break;
//     }

//     setErrors(prev => ({ ...prev, [name]: error }));
//     return !error;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const isValid = Object.keys(formData).every(field => 
//       validateField(field, formData[field])
//     );

//     if (!isValid) {
//       setSnackbar({
//         open: true,
//         message: 'Please correct the errors in the form',
//         severity: 'error'
//       });
//       return;
//     }

//     try {
//       await dispatch(PaymentAction(formData, history));
//       setSnackbar({
//         open: true,
//         message: 'Payment processed successfully!',
//         severity: 'success'
//       });
//       setTimeout(() => history.push("/booking"), 2000);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Payment failed. Please try again.',
//         severity: 'error'
//       });
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <StyledPaper elevation={3}>
//         <Box display="flex" alignItems="center" mb={4}>
//           <IconButton onClick={() => history.push('/viewturflist')} sx={{ mr: 2 }}>
//             <ArrowBack />
//           </IconButton>
//           <Typography variant="h4">Payment Details</Typography>
//         </Box>

//         <PaymentSummaryCard>
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle2">Booking ID</Typography>
//                 <Typography variant="h6">#{formData.bookingId}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle2">Amount</Typography>
//                 <Typography variant="h6">₹{formData.paymentAmount}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </PaymentSummaryCard>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Card Number"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleInputChange}
//                 error={!!errors.cardNumber}
//                 helperText={errors.cardNumber}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CreditCard />
//                     </InputAdornment>
//                   ),
//                 }}
//                 placeholder="1234 5678 9012 3456"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Cardholder Name"
//                 name="cardHolder"
//                 value={formData.cardHolder}
//                 onChange={handleInputChange}
//                 error={!!errors.cardHolder}
//                 helperText={errors.cardHolder}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Expiry Date"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleInputChange}
//                 error={!!errors.expiryDate}
//                 helperText={errors.expiryDate}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EventNote />
//                     </InputAdornment>
//                   ),
//                 }}
//                 placeholder="MM/YY"
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="CVV"
//                 name="cvv"
//                 type="password"
//                 value={formData.cvv}
//                 onChange={handleInputChange}
//                 error={!!errors.cvv}
//                 helperText={errors.cvv}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box display="flex" gap={2} mt={3}>
//                 <Button
//                   variant="outlined"
//                   startIcon={<ArrowBack />}
//                   onClick={() => history.push('/viewturflist')}
//                   fullWidth
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   startIcon={<PaymentIcon />}
//                   fullWidth
//                 >
//                   Confirm Payment
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>

//         <Box display="flex" justifyContent="center" mt={4}>
//           <Chip
//             icon={<Security />}
//             label="Secure Payment"
//             color="success"
//             variant="outlined"
//           />
//         </Box>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             severity={snackbar.severity}
//             variant="filled"
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </StyledPaper>
//     </Container>
//   );
// }










import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Fade,
  Divider,
  InputAdornment,
  Snackbar,
} from '@mui/material';
import {
  CreditCard,
  Lock,
  CalendarToday,
  Person,
  ArrowBack,
  Payment as PaymentIcon,
  Security,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PaymentAction from '../../Redux/Action/PaymentAction';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const PaymentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
  color: 'white',
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SecurityBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  color: theme.palette.success.main,
}));

function PaymentForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  // Payment Details
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    turfId: localStorage.getItem("turfId"),
    paymentAmount: localStorage.getItem("turfAmount"),
    bookingId: localStorage.getItem("bookingId") || Math.floor(Math.random() * 1000) + 1,
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // UI States
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const steps = ['Payment Details', 'Processing', 'Confirmation'];

  const validateForm = () => {
    const newErrors = {};

    // Card Number Validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    // Card Holder Validation
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Cardholder name is required';
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.cardHolder)) {
      newErrors.cardHolder = 'Invalid cardholder name';
    }

    // Expiry Date Validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }

    // CVV Validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Input formatting
    switch (name) {
      case 'cardNumber':
        formattedValue = value.replace(/\D/g, '').slice(0, 16);
        break;
      case 'cardHolder':
        formattedValue = value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
        break;
      case 'expiryDate':
        formattedValue = value
          .replace(/\D/g, '')
          .slice(0, 4)
          .replace(/(\d{2})(\d{2})/, '$1/$2');
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
      default:
        break;
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlert({
        open: true,
        message: 'Please correct the errors in the form',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    setActiveStep(1);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      await dispatch(PaymentAction(formData, history));
      
      setActiveStep(2);
      setAlert({
        open: true,
        message: 'Payment successful! Redirecting...',
        severity: 'success',
      });

      setTimeout(() => {
        history.push("/booking");
      }, 2000);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Payment failed. Please try again.',
        severity: 'error',
      });
      setActiveStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Fade in={true} timeout={800}>
        <PaymentCard>
          {/* Header */}
          <Box display="flex" alignItems="center" mb={4}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.push('/viewturflist')}
              disabled={loading}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" fontWeight="bold">
              Payment Details
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Payment Summary */}
          <SummaryCard elevation={3}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Booking ID
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    #{formData.bookingId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Amount to Pay
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ₹{formData.paymentAmount}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </SummaryCard>

          {/* Payment Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Cardholder Name"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  error={!!errors.cardHolder}
                  helperText={errors.cardHolder}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="MM/YY"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  type="password"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 4 }} />

          {/* Security Badges */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <SecurityBadge>
                <Lock /> Secure Payment
              </SecurityBadge>
            </Grid>
            <Grid item>
              <SecurityBadge>
                <Security /> SSL Encrypted
              </SecurityBadge>
            </Grid>
          </Grid>

          {/* Alert Snackbar */}
          <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={() => setAlert({ ...alert, open: false })}
          >
            <Alert
              onClose={() => setAlert({ ...alert, open: false })}
              severity={alert.severity}
              variant="filled"
              elevation={6}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </PaymentCard>
      </Fade>
    </StyledContainer>
  );
}

export default PaymentForm;