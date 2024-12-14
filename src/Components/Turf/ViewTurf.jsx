// //edit//view
// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// export default function ViewTurf() {
//     const [users, setusers] = useState([]);
//     const user="user";
//      const fetchData = async () => {
//         const result = await Axios.get(`http://localhost:8080/turf/available`);
//         // const result = await Axios.get(`http://localhost:8080/turf/availableturfs`);
//        // http://localhost:8080/turf/manager/4
//         console.log(result.data);
//          setusers(result.data);
//     }
// //
//     const deleteUser = async turfId => {
//         await Axios.delete(`http://localhost:8080/turf/${turfId}`);
//         //loadUsers();
//         fetchData();
//       };
//     useEffect(() => {

//         fetchData();
//     }, [])
//     return (
//         <div>

//             <h1>Turf List</h1>
//             <React.Fragment>

//                         <div>
//                             {users.length > 0 ?
//                                 <table className=" jumbotron table table-bordered shadow-lg m-5">
//                                     <thead>
//                                         <tr>
//                                         <th>Turf Id</th>
//                                             <th>Turf Name</th>
//                                             <th>Turf Address</th>
//                                             <th>Turf Description</th>
//                                             <th>Action</th>

//                                             {/* <th>Manager Id</th> */}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {
//                                             users.map((user) => (
//                                                 <tr key={user.turfId}>
//                                                     <td>{user.turfId}</td>
//                                                     <td>{user.turfName}</td>
//                                                     <td>{user.turfAdd}</td>
//                                                     <td>{user.turfType}</td>
//                                                     {/* <td>{user.managerId}</td> */}
//                                                     <td>
                                               
//                                                 <Link
//                                                     class="btn btn-outline-primary mr-2"
//                                                     to={`/turf/edit/${user.turfId}`}
//                                                 >
//                                                     Edit
//                                                 </Link>
//                                                 <Link
//                                                     class="btn btn-danger"
//                                                     onClick={() => deleteUser(user.turfId)}
//                                                    to={`/profile/admin/${user.turfId}`}
//                                                 >
//                                                     Delete
//                                                 </Link>
//                                             </td>
//                                                 </tr>
//                                             ))
//                                         }
//                                     </tbody>
//                                 </table>
//                                 : <h1>No Turf List is Available</h1>
//                             }</div>
//                  <Link className="btn btn-dark mb-4 tb" to="/profile/user">
//                     Back
//                 </Link>
                
//             </React.Fragment>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Rating,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocationOn,
  SportsSoccer,
  ArrowBack,
  Info,
  AttachMoney,
  Schedule,
  DirectionsCar,
  WaterDrop,
  Lightbulb
} from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const TurfImage = styled(CardMedia)({
  height: 200,
  backgroundSize: 'cover',
});

const Feature = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export default function ViewTurf() {
  const theme = useTheme();
  const history = useHistory();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:8080/turf/available');
      setTurfs(result.data);
      setError('');
    } catch (err) {
      setError('Failed to load available turfs');
      console.error('Error fetching turfs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const getTurfImage = (turfType) => {
    const images = {
      'FOOTBALL': '/images/football-turf.jpg',
      'CRICKET': '/images/cricket-turf.jpg',
      'FUTSAL': '/images/futsal-turf.jpg',
      'default': '/images/default-turf.jpg'
    };
    return images[turfType] || images.default;
  };

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
          <Grid container spacing={3}>
            {turfs.map((turf) => (
              <Grid item xs={12} md={6} lg={4} key={turf.turfId}>
                <StyledCard>
                  <TurfImage
                    image={getTurfImage(turf.turfType)}
                    title={turf.turfName}
                  />
                  <CardContent>
                    <Box mb={2}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {turf.turfName}
                      </Typography>
                      <Chip
                        label={turf.turfType}
                        color="primary"
                        size="small"
                        icon={<SportsSoccer />}
                        sx={{ mb: 2 }}
                      />
                    </Box>

                    <Feature>
                      <LocationOn color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {turf.turfAdd}
                      </Typography>
                    </Feature>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexWrap="wrap" gap={1}>
                      <Chip
                        icon={<AttachMoney />}
                        label="From ₹800/hr"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<Schedule />}
                        label="24/7 Available"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<DirectionsCar />}
                        label="Parking"
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box mt={2}>
                      <Rating value={4.5} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        4.5 out of 5
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ mt: 'auto', p: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => history.push(`/book-turf/${turf.turfId}`)}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={4}>
            <Info sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No turfs available at the moment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check back later
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}