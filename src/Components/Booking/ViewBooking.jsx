// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './list.css';

// export default function ViewBooking() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchBookings = async () => {
//         try {
//             const userId = localStorage.getItem("userId");
//             if (!userId) {
//                 throw new Error("User ID not found");
//             }
            
//             const response = await axios.get(`http://localhost:8080/booking/user/${userId}`);
//             setBookings(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//             setError("Failed to load bookings");
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     if (loading) return <h2 className="text-center text-white">Loading...</h2>;
//     if (error) return <h2 className="text-center text-white">{error}</h2>;

//     return (
//         <div>
//             <h1 className="display-6 text-center text-white mb-4">Booking List</h1>
//             {bookings.length > 0 ? (
//                 <table className="jumbotron table shadow-lg table-dark table-striped tb">
//                     <thead>
//                         <tr>
//                             <th>Booking Id</th>
//                             <th>Date</th>
//                             <th>Slot</th>
//                             <th>Amount</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking.id}>
//                                 <td>{booking.id}</td>
//                                 <td>{booking.date}</td>
//                                 <td>{getSlotDescription(booking.slotId)}</td>
//                                 <td>₹{booking.paymentAmount}</td>
//                                 <td>{booking.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <h2 className="display-6 text-center text-white mb-4">No bookings available</h2>
//             )}
//             <Link className="btn btn-dark mb-4 tb" to="/profile/user">
//                 Back
//             </Link>
//         </div>
//     );
// }

// function getSlotDescription(slotId) {
//     const slots = {
//         "1": "6AM-7AM",
//         "2": "8AM-9AM",
//         "3": "9AM-10AM",
//         "4": "10AM-12PM",
//         "5": "12PM-2PM",
//         "6": "2PM-3PM",
//         "7": "3PM-4PM",
//         "8": "5PM-6PM"
//     };
//     return slots[slotId] || `Slot ${slotId}`;
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  borderRadius: theme.spacing(1),
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  fontWeight: 'bold',
  backgroundColor: status === 'CONFIRMED' 
    ? theme.palette.success.light
    : status === 'PENDING'
    ? theme.palette.warning.light
    : theme.palette.error.light,
  color: status === 'CONFIRMED'
    ? theme.palette.success.dark
    : status === 'PENDING'
    ? theme.palette.warning.dark
    : theme.palette.error.dark,
}));

export default function ViewBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("User ID not found");
            }
            
            const response = await axios.get(`http://localhost:8085/booking/user/${userId}`);
            setBookings(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("Failed to load bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleRefresh = () => {
        fetchBookings();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" alignItems="center">
                        <IconButton 
                            onClick={() => history.push('/profile/user')}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            Your Bookings
                        </Typography>
                    </Box>
                    <Tooltip title="Refresh bookings">
                        <IconButton onClick={handleRefresh}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                ) : bookings.length > 0 ? (
                    <StyledTableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Booking ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time Slot</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>#{booking.id}</TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <EventIcon color="action" fontSize="small" />
                                                {new Date(booking.date).toLocaleDateString()}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <AccessTimeIcon color="action" fontSize="small" />
                                                {getSlotDescription(booking.slotId)}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <PaymentIcon color="action" fontSize="small" />
                                                ₹{booking.paymentAmount}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <StatusChip
                                                label={booking.status}
                                                status={booking.status}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                ) : (
                    <Alert severity="info">
                        You haven't made any bookings yet.
                    </Alert>
                )}

                <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => history.push('/profile/user')}
                    >
                        Back to Profile
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

function getSlotDescription(slotId) {
    const slots = {
        "1": "6:00 AM - 7:00 AM",
        "2": "8:00 AM - 9:00 AM",
        "3": "9:00 AM - 10:00 AM",
        "4": "10:00 AM - 12:00 PM",
        "5": "12:00 PM - 2:00 PM",
        "6": "2:00 PM - 3:00 PM",
        "7": "3:00 PM - 4:00 PM",
        "8": "5:00 PM - 6:00 PM"
    };
    return slots[slotId] || `Slot ${slotId}`;
}