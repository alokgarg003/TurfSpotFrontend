
// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import bg_1 from '../../images/bg_1.jpg';


// export default function UserViewTurfList() {
//     const [users, setusers] = useState([]);
//     const user = "user";
//     const fetchData = async () => {
//       const result = await Axios.get(`http://localhost:8082/turf/available`);
//        // const result = await Axios.get(`http://localhost:8080/turf/availableturfs`);
//         console.log(result.data);
//         setusers(result.data);
//     }

//     useEffect(() => {
//         fetchData();
//     }, [])

//     return (
//         <div>
//             <h1 class="display-6 text-center text-white mb-4">Turf List</h1>
//             {
//                 <div className="container profile-page bg-transparent">
//                     {users.length > 0 ?
//                         <div>
//                             {
//                                 users.map((user) => (
//                                     <div className="row">

//                                         <div className="card profile-header">
//                                             <div className="body">

//                                                 <div className="row">
//                                                     <div className="col-lg-4 col-md-4 col-12">
//                                                         <div className="profile-image float-md-center"> <img src={bg_1} alt="" /> </div>
//                                                     </div>
//                                                     <div className="col-lg-7 col-md-7 col-12">
//                                                     <table className=" table">
//                                                         <thead>
//                                                             <tr>
//                                                                 <th>Turf Id</th>
//                                                                 <th>Turf Name</th>
//                                                                 <th>Turf Address</th>
//                                                                 <th>Turf Description</th>
//                                                                 <th>Action</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             <tr key={user.turfId}>
//                                                                 <td>{user.turfId}</td>
//                                                                 <td>{user.turfName}</td>
//                                                                 <td>{user.turfAdd}</td>
//                                                                 <td>{user.turfType}</td>
//                                                                 <td><Link class="btn btn-primary mr-2" to={`/turf/viewsingleturf/${user.turfId}`}>
//                                                                 View
//                                                             </Link></td>
//                                                             </tr>
                                                            
//                                                         </tbody>
//                                                     </table>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>

//                                     </div>))}
//                         </div>
//                         : 
//                         <h1 class="display-6 text-center text-white mb-4">No Turf List is Available</h1>
//                     }
//                     {/* Back Button */}
//             <div className="text-center mt-4">
//                 <Link to="/profile/user" className="btn btn-dark">
//                     Back
//                 </Link>
//             </div>
//                 </div>
                
//             }

//         </div>
        
        
//     );
// }


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Divider,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocationOn,
  SportsSoccer,
  ArrowBack,
  AccessTime,
  Star,
  DirectionsCar,
  WaterDrop,
  Lightbulb
} from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const TurfImage = styled(CardMedia)(({ theme }) => ({
  width: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 200,
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

export default function UserViewTurfList() {
  const history = useHistory();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:8082/turf/available');
      setTurfs(result.data);
    } catch (err) {
      setError('Failed to load turfs. Please try again later.');
      console.error('Error fetching turfs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const getFacilities = (turf) => [
    { icon: <DirectionsCar />, label: 'Parking Available' },
    { icon: <WaterDrop />, label: 'Water Supply' },
    { icon: <Lightbulb />, label: 'Floodlights' },
    { icon: <AccessTime />, label: '24/7 Available' },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => history.push('/profile/user')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" component="h1">
              Available Turfs
            </Typography>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {turfs.length > 0 ? (
          turfs.map((turf) => (
            <StyledCard key={turf.turfId}>
              <TurfImage
                component="img"
                image={turf.image || '/path/to/default/turf-image.jpg'}
                alt={turf.turfName}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="h2">
                      {turf.turfName}
                    </Typography>
                    <Rating value={4.5} readOnly precision={0.5} />
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <LocationOn color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {turf.turfAdd}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <FeatureChip
                      icon={<SportsSoccer />}
                      label={turf.turfType}
                      color="primary"
                    />
                    {getFacilities(turf).map((facility, index) => (
                      <FeatureChip
                        key={index}
                        icon={facility.icon}
                        label={facility.label}
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {turf.description || 'Professional turf facility with modern amenities and excellent maintenance.'}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="h6" color="primary">
                      ₹1000/hour
                    </Typography>
                  </Box>
                </CardContent>

                <Divider />
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={() => history.push(`/turf/viewsingleturf/${turf.turfId}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => history.push(`/book-turf/${turf.turfId}`)}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </StyledCard>
          ))
        ) : (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No turfs available at the moment
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}