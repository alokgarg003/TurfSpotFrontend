// // import React from 'react'
// // import { useState, useEffect } from 'react';
// // import Axios from 'axios';
// // import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// // import './list.css';

// // export default function ManagerViewTurf() {
    
// //     const [users, setusers] = useState([]);
// //     const user="user";
// //     const managerId=localStorage.getItem("managerId")
// //      const fetchData = async () => {
// //         const result = await Axios.get(`http://localhost:8080/turf/manager/${managerId}`);
// //         //const result = await Axios.get(`http://localhost:8080/turf/fetchByManagerId/${managerId}`);
// //         console.log(result.data);
// //         setusers(result.data);
// //     }

// //     const deleteTurf = async turfId => {
// //         await Axios.delete(`http://localhost:8080/turf/${turfId}`);
// //         fetchData();
// //       };

// //     useEffect(() => {
// //         fetchData();
// //     }, [])

// //     return (
// //         <div>
// //             <h1 class="display-6 text-center text-white mb-4">Add Turf</h1>
// //             <React.Fragment>

// //                         <div>
// //                             {users.length > 0 ?
// //                                 <table className="jumbotron table shadow-lg table-dark table-striped tb">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Turf Id</th>
// //                                             <th>Turf Name</th>
// //                                             <th>Turf City</th>
// //                                             <th>Turf Description</th>
// //                                             <th>Action</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {
// //                                             users.map((user) => (
// //                                                 <tr key={user.turfId}>
// //                                                     <td>{user.turfId}</td>
// //                                                     <td>{user.turfName}</td>
// //                                                     <td>{user.turfAdd}</td>
// //                                                     <td>{user.turfType}</td>
// //                                                     <td>                                           
// //                                                         <Link
// //                                                             class="btn btn-outline-primary mr-2"
// //                                                             to={`/turf/edit/${user.turfId}`}
// //                                                         >
// //                                                             Edit
// //                                                         </Link>
                                                        
// //                                                         <Link     
// //                                                             class="btn btn-danger"                                               
// //                                                             onClick={() => {
// //                                                                 const confirmBox = window.confirm(
// //                                                                 "Do you really want to delete this record?"
// //                                                                 )
// //                                                                 if (confirmBox === true) {
// //                                                                     deleteTurf(user.turfId)                               
// //                                                                 }
// //                                                             }}
// //                                                             to={`/viewturf/${user.turfId}`}                                              
// //                                                         >
// //                                                             Delete
// //                                                         </Link>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))
// //                                         }
// //                                     </tbody>
// //                                 </table>
// //                                 : <h1 class="display-6 text-center text-white mb-4">No Turf List is Available</h1>
// //                             }
// //                         </div>
// //                         <Link className="btn btn-dark mb-4 tb" to="/profile/manager">
// //                             Back  
// //                         </Link> &nbsp; &nbsp; &nbsp;
// //             </React.Fragment>
// //         </div>
// //     )
// // }


// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import './list.css';

// export default function ManagerViewTurf() {
//     const [users, setUsers] = useState([]); // State to store the list of turfs
//     const managerId = localStorage.getItem("managerId"); // Get managerId from localStorage

//     // Fetch data for the turfs managed by the manager
//     const fetchData = async () => {
//         if (!managerId) {
//             console.error("Manager ID is missing in localStorage.");
//             return;
//         }

//         try {
//             const result = await Axios.get(`http://localhost:8082/turf/manager/${managerId}`);
//             console.log(result.data); // Log the result for debugging
//             setUsers(result.data); // Update the state with the fetched data
//         } catch (error) {
//             console.error("Error fetching turfs:", error); // Handle error if fetching fails
//         }
//     };

//     const deleteTurf = async (turfId) => {
//         console.log("Deleting turf with ID:", turfId); // Log turfId to ensure it's correct
//         const confirmBox = window.confirm("Do you really want to delete this record?");
//         if (confirmBox) {
//             try {
//                 await Axios.delete(`http://localhost:8084/managers/turf/manager/${turfId}`);
//                 //await Axios.delete(`http://localhost:8084/turf/${turfId}`);
//                 fetchData(); // Re-fetch data after deletion to update the list
//             } catch (error) {
//                 console.error("Error deleting turf:", error);
//             }
//         }
//     };
    
//     // Fetch data when the component is mounted
//     useEffect(() => {
//         fetchData();
//     }, []); // Empty dependency array ensures this runs only once when the component is mounted

//     return (
//         <div>
//             <h1 className="display-6 text-center text-white mb-4">Manage Your Turfs</h1>
//             <React.Fragment>
//                 <div>
//                     {/* Check if there are any turfs */}
//                     {users.length > 0 ? (
//                         <table className="jumbotron table shadow-lg table-dark table-striped tb">
//                             <thead>
//                                 <tr>
//                                     <th>Turf Id</th>
//                                     <th>Turf Name</th>
//                                     <th>Turf City</th>
//                                     <th>Turf Description</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* Loop through users and display each turf */}
//                                 {users.map((user) => (
//                                     <tr key={user.turfId}>
//                                         <td>{user.turfId}</td>
//                                         <td>{user.turfName}</td>
//                                         <td>{user.turfAdd}</td>
//                                         <td>{user.turfType}</td>
//                                         <td>
//                                             {/* Edit Button */}
//                                             <Link
//                                                 className="btn btn-outline-primary mr-2"
//                                                 to={`/turf/edit/${user.turfId}`}
//                                             >
//                                                 Edit
//                                             </Link>
//                                             {/* Delete Button */}
//                                             <button
//                                                 className="btn btn-danger"
//                                                 onClick={() => deleteTurf(user.turfId)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <h1 className="display-6 text-center text-white mb-4">No Turf List Available</h1>
//                     )}
//                 </div>

//                 {/* Back button */}
//                 <Link className="btn btn-dark mb-4 tb" to="/profile/manager">
//                     Back
//                 </Link>
//             </React.Fragment>
//         </div>
//     );
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
  CardActions,
  IconButton,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  SportsSoccer as SportsSoccerIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon
} from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  backgroundColor: status ? theme.palette.success.light : theme.palette.error.light,
  color: status ? theme.palette.success.dark : theme.palette.error.dark,
  fontWeight: 'bold',
  '& .MuiChip-label': {
    padding: '0 12px',
  },
}));

export default function ManagerViewTurf() {
  const history = useHistory();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, turfId: null });
  const [refreshKey, setRefreshKey] = useState(0);
  const managerId = localStorage.getItem("managerId");

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      if (!managerId) throw new Error("Manager ID not found");
      
      const result = await axios.get(`http://localhost:8082/turf/manager/${managerId}`);
      setTurfs(result.data);
      setError('');
    } catch (error) {
      setError('Failed to load turfs. Please try again.');
      console.error("Error fetching turfs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, [refreshKey]);

  const handleDelete = async (turfId) => {
    try {
      await axios.delete(`http://localhost:8084/managers/turf/manager/${turfId}`);
      setDeleteDialog({ open: false, turfId: null });
      setRefreshKey(old => old + 1);
    } catch (error) {
      setError('Failed to delete turf');
      console.error("Error deleting turf:", error);
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => history.push('/profile/manager')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Manage Your Turfs
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Refresh list">
              <IconButton onClick={() => setRefreshKey(old => old + 1)} sx={{ mr: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => history.push('/add-turf')}
            >
              Add New Turf
            </Button>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {turfs.length > 0 ? (
          <Grid container spacing={3}>
            {turfs.map((turf) => (
              <Grid item xs={12} sm={6} md={4} key={turf.turfId}>
                <StyledCard>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" component="h2">
                        {turf.turfName}
                      </Typography>
                      <StatusChip
                        label={turf.status ? "Available" : "Unavailable"}
                        status={turf.status}
                        size="small"
                      />
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationOnIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {turf.turfAdd}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <SportsSoccerIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {turf.turfType}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="caption" color="text.secondary">
                      Turf ID: #{turf.turfId}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit turf">
                      <IconButton
                        color="primary"
                        onClick={() => history.push(`/turf/edit/${turf.turfId}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete turf">
                      <IconButton
                        color="error"
                        onClick={() => setDeleteDialog({ open: true, turfId: turf.turfId })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={4}>
            <InfoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No turfs available
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Start by adding your first turf
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => history.push('/add-turf')}
            >
              Add New Turf
            </Button>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, turfId: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this turf? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, turfId: null })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(deleteDialog.turfId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}