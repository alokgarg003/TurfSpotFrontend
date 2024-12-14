// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import BookingAction from "../../Redux/Action/BookingAction";

// function BookingTurf() {
//   const [userState, setuserState] = useState({
//     userId: localStorage.getItem("userId") || "",
//     paymentId: localStorage.getItem("id") || "",
//     turfId: localStorage.getItem("turfId") || "",
//     paymentAmount: localStorage.getItem("paymentAmount") || "1100",
//     slotId: "",
//     date: ""
//   });

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
    
//     if (!userState.slotId || !userState.date) {
//       alert("Please select both slot and date");
//       return;
//     }

//     console.log("Submitting booking:", userState);
//     dispatch(BookingAction(userState, history));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-lg-12 form-block px-4">
//           <div className="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">
//             <h1 className="display-6 text-center text-white mb-4">Booking Details</h1>
            
//             <form onSubmit={onSubmitHandler}>
//               <div className="form-input">             
//                 <label htmlFor="slot" className="text-white">Choose a slot -- </label>
//                 <select
//                   className="bg-dark text-white"
//                   style={{opacity: 0.8}}
//                   name="slot"
//                   id="slot"                 
//                   onChange={(e) => {
//                     const slotId = e.target.value;
//                     setuserState({ ...userState, slotId });
//                   }}
//                   required
//                 >
//                   <option value="">Select a slot</option>
//                   <option value="1">6AM-7AM</option>
//                   <option value="2">8AM-9AM</option>
//                   <option value="3">9AM-10AM</option>
//                   <option value="4">10AM-12PM</option>
//                   <option value="5">12PM-2PM</option>
//                   <option value="6">2PM-3PM</option>
//                   <option value="7">3PM-4PM</option>
//                   <option value="8">5PM-6PM</option>
//                 </select>
//               </div> 

//               <div className="form-input">
//                 <span><i className="fas fa-calendar-alt"></i></span>
//                 <input
//                   type="date"
//                   name="date"
//                   placeholder="Turf booking date"
//                   required
//                   min={new Date().toISOString().split('T')[0]}
//                   onChange={(e) => {
//                     const date = e.target.value;
//                     setuserState({ ...userState, date });
//                   }}
//                 />
//               </div>
              
//               <div className="mb-3">
//                 <button
//                   type="submit"
//                   className="btn btn-block mb-4 shadow-lg"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingTurf;


import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BookingAction from '../../Redux/Action/BookingAction';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const timeSlots = [
  { id: 1, time: '6:00 AM - 7:00 AM' },
  { id: 2, time: '8:00 AM - 9:00 AM' },
  { id: 3, time: '9:00 AM - 10:00 AM' },
  { id: 4, time: '10:00 AM - 12:00 PM' },
  { id: 5, time: '12:00 PM - 2:00 PM' },
  { id: 6, time: '2:00 PM - 3:00 PM' },
  { id: 7, time: '3:00 PM - 4:00 PM' },
  { id: 8, time: '5:00 PM - 6:00 PM' },
];

function BookingTurf() {
  const [userState, setUserState] = useState({
    userId: localStorage.getItem('userId') || '',
    paymentId: localStorage.getItem('id') || '',
    turfId: localStorage.getItem('turfId') || '',
    paymentAmount: localStorage.getItem('paymentAmount') || '1100',
    slotId: '',
    date: '',
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userState.slotId || !userState.date) {
      setError('Please select both slot and date');
      return;
    }

    setError('');
    console.log('Submitting booking:', userState);
    dispatch(BookingAction(userState, history));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Book Your Turf
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Time Slot"
                value={userState.slotId}
                onChange={(e) => setUserState({ ...userState, slotId: e.target.value })}
                required
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Choose a time slot</em>
                </MenuItem>
                {timeSlots.map((slot) => (
                  <MenuItem key={slot.id} value={slot.id}>
                    {slot.time}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Booking Date"
                value={userState.date}
                onChange={(e) => setUserState({ ...userState, date: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0],
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Booking Amount: ₹{userState.paymentAmount}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  mt: 2,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default BookingTurf;