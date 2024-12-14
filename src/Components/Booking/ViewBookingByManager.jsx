// //edit//view
// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// export default function ViewBookingByManager() {
    
//     const [users, setusers] = useState([]);
//     const user="user";
//      const fetchData = async () => {
//         const managerId= localStorage.getItem("manager");
//        // const result = await Axios.get(`http://localhost:8080/booking/user/2`);
//         const result = await Axios.get(`http://localhost:8080/booking/user/${managerId}`);
//         console.log(result.data);
//         setusers(result.data);
//     }

//     useEffect(() => {
//         fetchData();
//     }, [])

//     return (
//         <div>
//             <h1 class="display-6 text-center text-white mb-4">Booking List</h1>
//             <h1>Booking List</h1>
//             <React.Fragment> 
//                         <div>
//                             {users.length > 0 ?
//                                 <table className=" jumbotron table table-bordered shadow-lg m-5">
//                                     <thead>
//                                         <tr>
//                                             <th>Booking Id</th>
//                                             <th>Booking Date</th>                                           
//                                             <th>Slot Id</th>
//                                             <th>Turf Id</th>
//                                             <th>User Id</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {
//                                             users.map((user) => (
//                                                 <tr key={user.bookingId}>
//                                                     <td>{user.bookingId}</td>
//                                                     <td>{user.date}</td>
//                                                     <td>{user.slotId}</td>
//                                                     <td>{user.turfId}</td>
//                                                     <td>{user.userId}</td>

//                                                     {/* <td>{user.managerId}</td> */}
//                                                     <td>
                                               
                                               
//                                             </td>
//                                                 </tr>
//                                             ))
//                                         }
//                                     </tbody>
//                                 </table>
//                                 : <h1>No booking List is Available</h1>
//                             }</div>
                
//             </React.Fragment>
//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Paper, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Box, CircularProgress,
    Alert, Chip, IconButton, Tooltip, Button, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    MenuItem, Select, FormControl, InputLabel, Card,
    CardContent, Grid, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Refresh as RefreshIcon,
    SportsSoccer as TurfIcon,
    Person as PersonIcon,
    Event as EventIcon,
    AccessTime as TimeIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
    },
}));

const StatusChip = styled(Chip)(({ status }) => ({
    backgroundColor: 
        status === 'CONFIRMED' ? '#4caf50' : 
        status === 'PENDING' ? '#ff9800' : 
        status === 'CANCELLED' ? '#f44336' : '#757575',
    color: '#fff',
    fontWeight: 'bold',
}));

const timeSlots = {
    "1": "6:00 AM - 7:00 AM",
    "2": "8:00 AM - 9:00 AM",
    "3": "9:00 AM - 10:00 AM",
    "4": "10:00 AM - 12:00 PM",
    "5": "12:00 PM - 2:00 PM",
    "6": "2:00 PM - 3:00 PM",
    "7": "3:00 PM - 4:00 PM",
    "8": "5:00 PM - 6:00 PM"
};

export default function ViewBookingByManager() {
    const [bookings, setBookings] = useState([]);
    const [managerTurfs, setManagerTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTurf, setSelectedTurf] = useState('all');
    const managerId = localStorage.getItem("managerId");

    const fetchData = async () => {
        try {
            setLoading(true);
            if (!managerId) {
                throw new Error("Manager ID not found");
            }

            // Fetch manager's turfs
            const turfsResponse = await axios.get(`http://localhost:8082/turf/manager/${managerId}`);
            const turfs = turfsResponse.data;
            setManagerTurfs(turfs);

            // Fetch all bookings
            const bookingsPromises = turfs.map(turf => 
                axios.get(`http://localhost:8085/booking/turf/${turf.turfId}`)
            );

            const bookingsResponses = await Promise.all(bookingsPromises);
            const allBookings = bookingsResponses
                .flatMap(response => response.data)
                .map(booking => ({
                    ...booking,
                    turfDetails: turfs.find(t => t.turfId === booking.turfId)
                }));

            setBookings(allBookings);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [managerId]);

    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            await axios.put(`http://localhost:8085/booking/${bookingId}/status`, { status: newStatus });
            await fetchData();
        } catch (error) {
            setError("Failed to update booking status");
        }
    };

    const filteredBookings = selectedTurf === 'all' 
        ? bookings 
        : bookings.filter(booking => booking.turfId === selectedTurf);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Booking Management
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center">
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Filter by Turf</InputLabel>
                            <Select
                                value={selectedTurf}
                                onChange={(e) => setSelectedTurf(e.target.value)}
                                label="Filter by Turf"
                            >
                                <MenuItem value="all">All Turfs</MenuItem>
                                {managerTurfs.map(turf => (
                                    <MenuItem key={turf.turfId} value={turf.turfId}>
                                        {turf.turfName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Tooltip title="Refresh bookings">
                            <IconButton onClick={fetchData}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                ) : filteredBookings.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredBookings.map((booking) => (
                            <Grid item xs={12} md={6} key={booking.bookingId}>
                                <StyledCard>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6">
                                                Booking #{booking.bookingId}
                                            </Typography>
                                            <StatusChip 
                                                label={booking.status || 'PENDING'}
                                                status={booking.status || 'PENDING'}
                                                size="small"
                                            />
                                        </Box>

                                        <Box display="flex" alignItems="center" mb={1}>
                                            <TurfIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            <Typography variant="body1">
                                                {booking.turfDetails?.turfName}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" mb={1}>
                                            <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {booking.turfDetails?.turfAdd}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" mb={1}>
                                            <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            <Typography variant="body2">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" mb={1}>
                                            <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            <Typography variant="body2">
                                                {timeSlots[booking.slotId]}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center">
                                            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            <Typography variant="body2">
                                                User #{booking.userId}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Box display="flex" justifyContent="flex-end" gap={1}>
                                            <Tooltip title="Confirm Booking">
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleUpdateStatus(booking.bookingId, 'CONFIRMED')}
                                                    disabled={booking.status === 'CONFIRMED'}
                                                >
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Cancel Booking">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleUpdateStatus(booking.bookingId, 'CANCELLED')}
                                                    disabled={booking.status === 'CANCELLED'}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        No bookings available for the selected turf.
                    </Alert>
                )}
            </Paper>
        </Container>
    );
}