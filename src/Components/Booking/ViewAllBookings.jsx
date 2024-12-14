// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Container,
//     Paper,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Box,
//     CircularProgress,
//     Alert,
//     Chip,
//     IconButton,
//     Tooltip,
//     TextField,
//     InputAdornment
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import PersonIcon from '@mui/icons-material/Person';
// import EventIcon from '@mui/icons-material/Event';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SearchIcon from '@mui/icons-material/Search';
// import PaymentIcon from '@mui/icons-material/Payment';

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//     margin: theme.spacing(3, 0),
//     borderRadius: theme.spacing(1),
//     '& .MuiTableCell-head': {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText,
//         fontWeight: 'bold',
//     },
//     '& .MuiTableRow-root:hover': {
//         backgroundColor: theme.palette.action.hover,
//     },
// }));

// const StatusChip = styled(Chip)(({ status }) => ({
//     backgroundColor: status === 'CONFIRMED' ? '#4caf50' : '#ff9800',
//     color: '#fff',
//     fontWeight: 'bold',
// }));

// const SlotChip = styled(Chip)(({ theme }) => ({
//     backgroundColor: theme.palette.info.light,
//     color: theme.palette.info.dark,
//     fontWeight: 'bold',
// }));

// function getSlotDescription(slotId) {
//     const slots = {
//         "1": "6:00 AM - 7:00 AM",
//         "2": "8:00 AM - 9:00 AM",
//         "3": "9:00 AM - 10:00 AM",
//         "4": "10:00 AM - 12:00 PM",
//         "5": "12:00 PM - 2:00 PM",
//         "6": "2:00 PM - 3:00 PM",
//         "7": "3:00 PM - 4:00 PM",
//         "8": "5:00 PM - 6:00 PM"
//     };
//     return slots[slotId] || `Slot ${slotId}`;
// }

// export default function ViewAllBookings() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const result = await axios.get('http://localhost:8085/booking');
//             setBookings(result.data);
//             setError(null);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//             setError("Failed to load bookings. Please try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const filteredBookings = bookings.filter(booking => 
//         booking.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.turfId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//             <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Typography variant="h4" component="h1">
//                         All Bookings Dashboard
//                     </Typography>
//                     <Box display="flex" gap={2}>
//                         <TextField
//                             size="small"
//                             placeholder="Search bookings..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                         <Tooltip title="Refresh bookings">
//                             <IconButton onClick={fetchData}>
//                                 <RefreshIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>

//                 {loading ? (
//                     <Box display="flex" justifyContent="center" p={4}>
//                         <CircularProgress />
//                     </Box>
//                 ) : error ? (
//                     <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
//                 ) : filteredBookings.length > 0 ? (
//                     <StyledTableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Booking ID</TableCell>
//                                     <TableCell>Date</TableCell>
//                                     <TableCell>Time Slot</TableCell>
//                                     <TableCell>Turf</TableCell>
//                                     <TableCell>User</TableCell>
//                                     <TableCell>Payment</TableCell>
//                                     <TableCell>Status</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredBookings.map((booking) => (
//                                     <TableRow key={booking.id}>
//                                         <TableCell>#{booking.id}</TableCell>
//                                         <TableCell>
//                                             <Box display="flex" alignItems="center" gap={1}>
//                                                 <EventIcon color="action" fontSize="small" />
//                                                 {new Date(booking.date).toLocaleDateString()}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box display="flex" alignItems="center" gap={1}>
//                                                 <AccessTimeIcon color="action" fontSize="small" />
//                                                 <SlotChip 
//                                                     label={getSlotDescription(booking.slotId)}
//                                                     size="small"
//                                                 />
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box display="flex" alignItems="center" gap={1}>
//                                                 <SportsSoccerIcon color="action" fontSize="small" />
//                                                 Turf #{booking.turfId}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box display="flex" alignItems="center" gap={1}>
//                                                 <PersonIcon color="action" fontSize="small" />
//                                                 User #{booking.userId}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Box display="flex" alignItems="center" gap={1}>
//                                                 <PaymentIcon color="action" fontSize="small" />
//                                                 ₹{booking.paymentAmount}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             <StatusChip 
//                                                 label={booking.status}
//                                                 status={booking.status}
//                                                 size="small"
//                                             />
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </StyledTableContainer>
//                 ) : (
//                     <Alert severity="info">
//                         No bookings found matching your search.
//                     </Alert>
//                 )}
//             </Paper>
//         </Container>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Grid, Paper, Typography, Box, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, Tooltip, FormControl, InputLabel, Select,
    MenuItem, CircularProgress, Alert, AppBar, Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    margin: theme.spacing(2),
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
    backgroundColor: 
        status === 'CONFIRMED' ? '#4caf50' : 
        status === 'PENDING' ? '#ff9800' : 
        '#f44336',
    color: '#fff',
}));

export default function ViewAllBookings() {
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8085/booking');
            setBookings(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch bookings. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getFilteredBookings = () => {
        if (!searchTerm) return bookings;

        return bookings.filter(booking => {
            switch (filterType) {
                case 'bookingId':
                    return booking.id.toString().includes(searchTerm);
                case 'userId':
                    return booking.userId.toLowerCase().includes(searchTerm.toLowerCase());
                case 'turfId':
                    return booking.turfId.toLowerCase().includes(searchTerm.toLowerCase());
                case 'status':
                    return booking.status.toLowerCase().includes(searchTerm.toLowerCase());
                case 'all':
                default:
                    return (
                        booking.id.toString().includes(searchTerm) ||
                        booking.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.turfId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.status.toLowerCase().includes(searchTerm.toLowerCase())
                    );
            }
        });
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        onClick={() => history.goBack()}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                        Booking Management
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* Search and Filters */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Filter By</InputLabel>
                                <Select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    label="Filter By"
                                >
                                    <MenuItem value="all">All Fields</MenuItem>
                                    <MenuItem value="bookingId">Booking ID</MenuItem>
                                    <MenuItem value="userId">User ID</MenuItem>
                                    <MenuItem value="turfId">Turf ID</MenuItem>
                                    <MenuItem value="status">Status</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Tooltip title="Refresh">
                                <IconButton onClick={fetchBookings}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Bookings Table */}
                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <StyledTableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Booking ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time Slot</TableCell>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Turf ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getFilteredBookings().map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>{booking.id}</TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <EventIcon fontSize="small" />
                                                {new Date(booking.date).toLocaleDateString()}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{booking.slotId}</TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <PersonIcon fontSize="small" />
                                                {booking.userId}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <SportsSoccerIcon fontSize="small" />
                                                {booking.turfId}
                                            </Box>
                                        </TableCell>
                                        <TableCell>₹{booking.paymentAmount}</TableCell>
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
                )}
            </Container>
        </>
    );
}