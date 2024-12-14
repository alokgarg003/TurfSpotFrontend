// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Link, Redirect, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import TurfAction from "../../Redux/Action/TurfAction";
// function AddTurf(props) {
//   // Initialize state with pre-filled data for managerId = 1
//   const [userState, setuserState] = useState({
//     managerId: localStorage.getItem("managerId") || 1,
//     turfAdd: "",
//     turfName: "",
//     turfAmount: 0,
//     turfType: "",
//     isAvailable: true,
//   });

//   const dispatch = useDispatch();
//   const history = useHistory();

//   // Fake data for managerId = 1 (multiple turfs)
//   const fakeData = {
//     1: [
//       {
//         turfName: "Football Turf 1",
//         turfAdd: "Street 101, CityCenter",
//         turfType: "Football",
//         turfAmount: 2000,
//       },
//       {
//         turfName: "Football Turf 2",
//         turfAdd: "Street 102, CityCenter",
//         turfType: "Football",
//         turfAmount: 2500,
//       },
//       {
//         turfName: "Cricket Turf",
//         turfAdd: "Street 103, CityCenter",
//         turfType: "Cricket",
//         turfAmount: 3000,
//       },
//     ],
//   };

//   // Check if there's fake data for managerId 1 and prefill the form
//   useEffect(() => {
//     const managerId = localStorage.getItem("managerId") || 2;
//     if (fakeData[managerId]) {
//       setuserState({
//         ...userState,
//         ...fakeData[managerId][0], // pre-fill with the first turf as default
//       });
//     }
//   }, []);

//   // Handle form submission
//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     localStorage.setItem("addTurf", JSON.stringify(userState)); // Save state to localStorage
//     alert("Turf added successfully");
//     dispatch(TurfAction(userState, history)); // Dispatch action with form data
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-lg-12 form-block px-4">
//           <div className="col-lg-8 col-md-6 col-sm-8 col-xs-12 form-box">
//             <h1 className="display-6 text-center text-white mb-4">Add Turf</h1>
//             <form onSubmit={onSubmitHandler}>
//               <div className="form-input">
//                 <span>
//                   <i className="fas fa-user-alt"></i>
//                 </span>
//                 <input
//                   type="text"
//                   name="turfName"
//                   value={userState.turfName}
//                   placeholder="Turf Name"
//                   required
//                   onChange={(e) => {
//                     const turfName = e.target.value;
//                     setuserState({ ...userState, turfName });
//                   }}
//                 />
//               </div>

//               <div className="form-input">
//                 <span>
//                   <i className="fas fa-house-user"></i>
//                 </span>
//                 <input
//                   type="text"
//                   name="turfAdd"
//                   value={userState.turfAdd}
//                   placeholder="Turf Address"
//                   required
//                   onChange={(e) => {
//                     const turfAdd = e.target.value;
//                     setuserState({ ...userState, turfAdd });
//                   }}
//                 />
//               </div>

//               <div className="form-input">
//                 <span>
//                   <i className="fas fa-laptop-code"></i>
//                 </span>
//                 <input
//                   type="text"
//                   name="turfType"
//                   value={userState.turfType}
//                   placeholder="Turf Description"
//                   required
//                   onChange={(e) => {
//                     const turfType = e.target.value;
//                     setuserState({ ...userState, turfType });
//                   }}
//                 />
//               </div>

//               <div className="form-input">
//                 <span>
//                   <i className="fas fa-dollar-sign"></i>
//                 </span>
//                 <input
//                   type="text"
//                   name="turfAmount"
//                   value={userState.turfAmount}
//                   placeholder="Turf Price"
//                   required
//                   onChange={(e) => {
//                     const turfAmount = e.target.value;
//                     setuserState({ ...userState, turfAmount });
//                   }}
//                 />
//               </div>

//               <div className="mb-3">
//                 <button type="submit" className="btn btn-block shadow-lg">
//                   Add Turf
//                 </button>
//               </div>
//               <Link className="btn text-white text-decoration-underline" to="/profile/manager">
//                 Back To Home
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddTurf;


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  FormControlLabel,
  Switch,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TurfAction from '../../Redux/Action/TurfAction';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const turfTypes = [
  { value: 'FOOTBALL', label: 'Football' },
  { value: 'CRICKET', label: 'Cricket' },
  { value: 'FUTSAL', label: 'Futsal' },
  { value: 'MULTI_PURPOSE', label: 'Multi Purpose' },
];

const surfaceTypes = [
  { value: 'ARTIFICIAL_GRASS', label: 'Artificial Grass' },
  { value: 'NATURAL_GRASS', label: 'Natural Grass' },
  { value: 'SYNTHETIC_TURF', label: 'Synthetic Turf' },
];

function AddTurf() {
  const [formData, setFormData] = useState({
    managerId: localStorage.getItem("managerId") || '',
    turfName: '',
    turfAdd: '',
    turfAmount: '',
    turfType: '',
    surfaceType: '',
    isAvailable: true,
    facilities: {
      lighting: false,
      parking: false,
      changeRoom: false,
      waterSupply: false,
    },
    dimensions: {
      length: '',
      width: '',
    },
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.turfName || !formData.turfAdd || !formData.turfAmount || !formData.turfType) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      localStorage.setItem("addTurf", JSON.stringify(formData));
      dispatch(TurfAction(formData, history));
      alert("Turf added successfully!");
    } catch (error) {
      setError('Failed to add turf. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" mb={4}>
            <IconButton onClick={() => history.push('/profile/manager')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Add New Turf
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Turf Name"
                name="turfName"
                value={formData.turfName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <SportsSoccerIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Turf Type"
                name="turfType"
                value={formData.turfType}
                onChange={handleChange}
                required
              >
                {turfTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="turfAdd"
                value={formData.turfAdd}
                onChange={handleChange}
                required
                multiline
                rows={2}
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Surface Type"
                name="surfaceType"
                value={formData.surfaceType}
                onChange={handleChange}
                required
              >
                {surfaceTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hourly Rate (₹)"
                name="turfAmount"
                type="number"
                value={formData.turfAmount}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: '₹',
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Facilities Available
              </Typography>
              <Grid container spacing={2}>
                {Object.keys(formData.facilities).map((facility) => (
                  <Grid item xs={6} sm={3} key={facility}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.facilities[facility]}
                          onChange={() => handleFacilityChange(facility)}
                        />
                      }
                      label={facility.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => history.push('/profile/manager')}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: 200 }}
                >
                  Add Turf
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default AddTurf;