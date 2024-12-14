import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  IconButton,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocationOn,
  SportsSoccer,
  ArrowBack,
  AttachMoney,
  AccessTime,
  DirectionsCar,
  WaterDrop,
  Lightbulb,
  Security,
  Restaurant,
  LocalParking,
  Shower
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

export default function ViewSingleTurf() {
  const history = useHistory();
  const { turfId } = useParams();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTurfDetails();
  }, [turfId]);

  const loadTurfDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8082/turf/${turfId}`);
      setTurf(response.data);
      localStorage.setItem("turfId", response.data.turfId);
      localStorage.setItem("turfAmount", response.data.turfAmount);
    } catch (err) {
      setError('Failed to load turf details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <DirectionsCar />, label: 'Parking Available' },
    { icon: <WaterDrop />, label: 'Water Supply' },
    { icon: <Lightbulb />, label: 'Floodlights' },
    { icon: <Security />, label: '24/7 Security' },
    { icon: <Restaurant />, label: 'Cafeteria' },
    { icon: <Shower />, label: 'Changing Rooms' },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => history.push('/viewturflist')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            Turf Details
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Turf Image */}
          <Grid item xs={12} md={6}>
            <Card elevation={0}>
              <CardMedia
                component="img"
                height="400"
                image="/path/to/turf-image.jpg"
                alt={turf?.turfName}
                sx={{ borderRadius: 2 }}
              />
            </Card>
          </Grid>

          {/* Turf Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {turf?.turfName}
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={4.5} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  (4.5/5 based on 120 reviews)
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={3}>
                <LocationOn color="action" sx={{ mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {turf?.turfAdd}
                </Typography>
              </Box>

              <Typography variant="h5" color="primary" mb={2}>
                ₹{turf?.turfAmount}/hour
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {turf?.turfType} - Professional turf facility with state-of-the-art amenities
                and excellent maintenance.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Facilities
              </Typography>
              <Box display="flex" flexWrap="wrap" mb={3}>
                {features.map((feature, index) => (
                  <FeatureChip
                    key={index}
                    icon={feature.icon}
                    label={feature.label}
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Operating Hours
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Weekdays: 6:00 AM - 10:00 PM"
                    secondary="Weekends: 6:00 AM - 11:00 PM"
                  />
                </ListItem>
              </List>

              <Box display="flex" gap={2} mt={4}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => history.push('/viewturflist')}
                  fullWidth
                >
                  Back to List
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AttachMoney />}
                  onClick={() => history.push('/paymentform')}
                  fullWidth
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
}