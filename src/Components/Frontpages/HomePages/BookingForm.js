// import React from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import { Nav } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './BookingForm.css';


// export default function BookingForm() {
//     return (
//         <div className="centerForm">
//             <Nav variant="pills" defaultActiveKey="/home">
//                 <Nav.Item>
//                     <Form.Control type="text"  placeholder="Enter your city"/>
//                 </Nav.Item>
//                 <Nav.Item>
//                     <Button className="btn searcBtn jsSearchBtn">
//                     <FontAwesomeIcon icon="fa-search" />
//                         Search
//                     </Button>
//                 </Nav.Item>
//             </Nav>
//             </div>


//     )
// }




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Paper,
    TextField,
    Button,
    Box,
    Container,
    InputAdornment,
    CircularProgress,
    Alert,
    Typography,
    Divider
} from '@mui/material';
import {
    Search as SearchIcon,
    LocationOn as LocationIcon,
    SportsSoccer as TurfIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BookingAction, { resetBooking } from '../../Redux/Actions/BookingAction';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: 800,
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

export default function BookingForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading, error, success } = useSelector(state => state.booking);
    
    const [city, setCity] = useState('');
    const [bookingData, setBookingData] = useState({
        userId: '',
        turfId: '',
        date: '',
        slotId: '',
        paymentAmount: ''
    });

    useEffect(() => {
        return () => {
            dispatch(resetBooking());
        };
    }, [dispatch]);

    const handleSearch = () => {
        if (!city.trim()) {
            return;
        }
        // Add your search logic here
        console.log('Searching for turfs in:', city);
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        dispatch(BookingAction(bookingData, history));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    mb: 4
                }}
            >
                <StyledPaper elevation={3}>
                    {/* Title */}
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mb: 3 
                        }}
                    >
                        <TurfIcon color="primary" />
                        Book Your Turf
                    </Typography>

                    {/* Search Section */}
                    <SearchBox>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            startIcon={<SearchIcon />}
                            disabled={loading}
                            sx={{
                                minWidth: 120,
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                        >
                            Search
                        </Button>
                    </SearchBox>

                    <Divider sx={{ my: 3 }} />

                    {/* Booking Form */}
                    <form onSubmit={handleBookingSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="User ID"
                                name="userId"
                                value={bookingData.userId}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Turf ID"
                                name="turfId"
                                value={bookingData.turfId}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                fullWidth
                                type="date"
                                label="Date"
                                name="date"
                                value={bookingData.date}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Time Slot"
                                name="slotId"
                                value={bookingData.slotId}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Payment Amount"
                                name="paymentAmount"
                                value={bookingData.paymentAmount}
                                onChange={handleInputChange}
                                required
                            />

                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            {success && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    Booking successful!
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Confirm Booking'
                                )}
                            </Button>
                        </Box>
                    </form>
                </StyledPaper>
            </Box>
        </Container>
    );
}