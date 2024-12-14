// // import React, { useState, useEffect } from "react";
// // import Axios from "axios";
// // import { useHistory, useParams } from "react-router-dom";

// // const EditTurf = () => {
// //   let history = useHistory();
// //   const { turfId } = useParams();

// //   // Define the user state
// //   const [user, setUser] = useState({
// //     turfId: "",
// //     turfName: "",
// //     turfAdd: "",
// //     turfType: "",
// //     managerId: ""
// //   });

// //   const { turfName, turfAdd, turfType, managerId } = user;

// //   // Handle input changes
// //   const onInputChange = e => {
// //     setUser({ ...user, [e.target.name]: e.target.value });
// //   };

// //   // Load turf details based on turfId
// //   useEffect(() => {
// //     loadUser();
// //   }, [turfId]);  // Add turfId as a dependency

// //   const loadUser = async () => {
// //     try {
// //       const result = await Axios.get(`http://localhost:8080/turf/${turfId}`);
// //       setUser(result.data); // Set fetched data into state
// //     } catch (error) {
// //       console.error("Error fetching turf data", error);
// //     }
// //   };

// //   const onSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       await Axios.put(`http://localhost:8084/managers/turf/manager/${turfId}`, user);
// //       alert("Turf updated successfully");
// //       history.push("/viewturf"); // Redirect after successful update
// //     } catch (error) {
// //       console.error("Error updating turf", error);
// //     }
// //   };

// //   return (
// //     <div className="container bg-transparent">
// //       <div className="w-75 mx-auto shadow p-5">
// //         <h1 className="display-6 text-center text-white mb-4">Edit Turf Details</h1>

// //         <form onSubmit={onSubmit}>
// //           <div className="form-group">
// //             <label className="text-black">TurfId</label>
// //             <input
// //               type="text"
// //               className="form-control form-control-lg"
// //               name="turfId"
// //               value={turfId}  // Disabled fields shouldn't have onChange
// //               disabled
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label className="text-black">Turf Name</label>
// //             <input
// //               type="text"
// //               className="form-control form-control-lg"
// //               name="turfName"
// //               value={turfName}
// //               disabled // Disabled as per your requirement
// //               onChange={onInputChange}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label className="text-black">Turf City</label>
// //             <input
// //               type="text"
// //               className="form-control form-control-lg"
// //               name="turfAdd"
// //               value={turfAdd}
// //               onChange={onInputChange}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label className="text-black">Turf Description</label>
// //             <input
// //               type="text"
// //               className="form-control form-control-lg"
// //               name="turfType"
// //               value={turfType}
// //               onChange={onInputChange}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label className="text-black">Manager Id</label>
// //             <input
// //               type="text"
// //               className="form-control form-control-lg"
// //               name="managerId"
// //               value={managerId}
// //               onChange={onInputChange}
// //             />
// //           </div>

// //           <button className="btn btn-dark btn-block mt-4">Update Turf</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditTurf;
// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { useHistory, useParams } from "react-router-dom";

// const EditTurf = () => {
//   let history = useHistory();
//   const { turfId } = useParams();

//   // Define the user state with status for availability
//   const [user, setUser] = useState({
//     turfId: "",
//     turfName: "",
//     turfAdd: "",
//     turfType: "",
//     managerId: "",
//     status: true, // true means available, false means not available
//   });

//   const { turfName, turfAdd, turfType, managerId, status } = user;

//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     loadUser();
//   }, [turfId]);

//   const loadUser = async () => {
//     try {
//       const result = await Axios.get(`http://localhost:8080/turf/${turfId}`);
//       setUser(result.data); // Set fetched data into state
//     } catch (error) {
//       console.error("Error fetching turf data", error);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await Axios.put(
//         `http://localhost:8084/managers/turf/${turfId}`,
//         user
//       );
//       alert("Turf updated successfully");
//       history.push("/viewturf"); // Redirect after successful update
//     } catch (error) {
//       console.error("Error updating turf", error);
//     }
//   };

//   // Function to toggle the availability status (PATCH request)
//   const toggleAvailability = async () => {
//     const updatedStatus = !status; // Toggle the availability status
//     try {
//       // Send a PATCH request to update the availability status of the turf
//       await Axios.patch(
//         `http://localhost:8084/managers/turf/manager/${turfId}/availability`,
//         null, // No body content
//         { params: { availability: updatedStatus } } // Send the availability as a query parameter
//       );
//       setUser({ ...user, status: updatedStatus }); // Update the status locally
//       alert(`Turf is now ${updatedStatus ? "available" : "not available"}`);
//     } catch (error) {
//       console.error("Error updating availability status", error);
//     }
//   };

//   return (
//     <div className="container bg-transparent">
//       <div className="w-75 mx-auto shadow p-5">
//         <h1 className="display-6 text-center text-white mb-4">Edit Turf Details</h1>

//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label className="text-black">TurfId</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               name="turfId"
//               value={turfId} // Disabled fields shouldn't have onChange
//               disabled
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-black">Turf Name</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               name="turfName"
//               value={turfName}
//               disabled
//               onChange={onInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-black">Turf City</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               name="turfAdd"
//               value={turfAdd}
//               onChange={onInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-black">Turf Description</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               name="turfType"
//               value={turfType}
//               onChange={onInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-black">Manager Id</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               name="managerId"
//               value={managerId}
//               onChange={onInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label className="text-black">Availability Status</label>
//             <button
//               type="button"
//               className={`btn ${status ? "btn-success" : "btn-danger"} btn-block mt-4`}
//               onClick={toggleAvailability}
//             >
//               {status ? "Set as Not Available" : "Set as Available"}
//             </button>
//           </div>

//           <button className="btn btn-dark btn-block mt-4">Update Turf</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTurf;


import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Paper, Typography, TextField, Button, Box,
    Switch, FormControlLabel, Alert, CircularProgress,
    Grid, Card, CardContent, Snackbar
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    ArrowBack as ArrowBackIcon,
    LocationOn as LocationIcon,
    Description as DescriptionIcon,
    Person as PersonIcon,
    SportsSoccer as TurfIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    padding: theme.spacing(2),
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const EditTurf = () => {
    const history = useHistory();
    const { turfId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const [turf, setTurf] = useState({
        turfId: '',
        turfName: '',
        turfAdd: '',
        turfType: '',
        managerId: '',
        status: true,
    });

    // Fetch turf details when component mounts
    useEffect(() => {
        const fetchTurfDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8082/turf/${turfId}`);
                console.log('Fetched turf data:', response.data);
                setTurf(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching turf details:', err);
                setError('Failed to load turf details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (turfId) {
            fetchTurfDetails();
        }
    }, [turfId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTurf(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusToggle = () => {
        setTurf(prev => ({
            ...prev,
            status: !prev.status
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`http://localhost:8084/managers/turf/manager/${turfId}`, turf);
            
            setSnackbar({
                open: true,
                message: 'Turf updated successfully!',
                severity: 'success'
            });
            
            // Redirect after short delay
            setTimeout(() => {
                history.push('/viewturf');
            }, 1500);
        } catch (err) {
            console.error('Error updating turf:', err);
            setSnackbar({
                open: true,
                message: 'Failed to update turf. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <StyledPaper elevation={3}>
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => history.push('/viewturf')}
                    >
                        Back to Turfs
                    </Button>
                    <Typography variant="h4" component="h1">
                        Edit Turf Details
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <Typography variant="h6" gutterBottom>
                                    Basic Information
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={3}>
                                    <TextField
                                        fullWidth
                                        label="Turf ID"
                                        name="turfId"
                                        value={turf.turfId}
                                        disabled
                                        InputProps={{
                                            startAdornment: <TurfIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Turf Name"
                                        name="turfName"
                                        value={turf.turfName}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: <TurfIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                </Box>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <Typography variant="h6" gutterBottom>
                                    Location & Details
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={3}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="turfAdd"
                                        value={turf.turfAdd}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: <LocationIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="turfType"
                                        value={turf.turfType}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={2}
                                        InputProps={{
                                            startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                </Box>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12}>
                            <StyledCard>
                                <Typography variant="h6" gutterBottom>
                                    Management Settings
                                </Typography>
                                <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
                                    <TextField
                                        label="Manager ID"
                                        name="managerId"
                                        value={turf.managerId}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={turf.status}
                                                onChange={handleStatusToggle}
                                                color="primary"
                                            />
                                        }
                                        label={turf.status ? "Available" : "Not Available"}
                                    />
                                </Box>
                            </StyledCard>
                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => history.push('/viewturf')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Box>
                </form>
            </StyledPaper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EditTurf;