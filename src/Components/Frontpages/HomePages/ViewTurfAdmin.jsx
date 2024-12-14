// //edit//view
// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './list.css';

// export default function ViewTurfAdmin() {
//     const [users, setusers] = useState([]);
//     const user="user";
    
//     const fetchData = async () => {
//         //const result = await Axios.get(`http://localhost:8080/turf/all`);
//         const result = await Axios.get(`http://localhost:8084/admin/turfs`);
//         console.log(result.data); 
//         setusers(result.data);
//     }

//     const deleteUser = async turfId => {
//         await Axios.delete(`http://localhost:8084/admin/turfs/${turfId}`);
//         //loadUsers();
//         alert(`${turfId} is deleted`)
//         fetchData();
//     };

//     useEffect(() => {
//         fetchData();
//     }, [])

//     return (
//         <div>
//             <h1 class="display-6 text-center text-white mb-4">Turf List</h1>
//             <React.Fragment>
//                         <div>
//                             {users.length > 0 ?
//                                 <table className="jumbotron table shadow-lg table-dark table-striped tb">
//                                     <thead>
//                                         <tr>
//                                         <th>Turf Id</th>
//                                             <th>Turf Name</th>
//                                             <th>Turf Address</th>
//                                             <th>Turf Description</th>
//                                             <th>Amount</th>
//                                             <th>Action</th>
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
//                                                     <td>{user.turfAmount}</td>
//                                                     <td>                      
                                               
//                                                 <Link     
//                                                     class="btn btn-danger"                                               
//                                                     onClick={() => {
//                                                         const confirmBox = window.confirm(
//                                                             "Do you really want to delete this record?"
//                                                         )
//                                                         if (confirmBox === true) {
//                                                             deleteUser(user.turfId)                               
//                                                         }
//                                                     }}
//                                                     to={`/turflist/${user.turfId}`}                                             
//                                                 >
//                                                     Delete
//                                                 </Link>

//                                             </td>
//                                             </tr>
//                                             ))
//                                         }
//                                     </tbody>
//                                 </table>
//                                 : <h1 class="display-6 text-center text-white mb-4">No Turf List is Available!</h1>
//                             }</div>
//                             <Link className="btn btn-primary btn-dark mb-4 tb" to="/profile/admin">
//                                 Back  
//                             </Link> &nbsp; &nbsp; &nbsp;
                
//             </React.Fragment>
//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fade,
    Snackbar,
    Chip
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    LocationOn as LocationIcon,
    Description as DescriptionIcon,
    AttachMoney as MoneyIcon,
    SportsFootball as SportsIcon
} from '@mui/icons-material';

// You can add these images to your project
const turfImages = [
    '/turf1.jpg',
    '/turf2.jpg',
    '/turf3.jpg',
    // Add more turf images
];

export default function ViewTurfAdmin() {
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, turfId: null });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://localhost:8084/admin/turfs`);
            setTurfs(result.data);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to load turfs' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (turfId) => {
        try {
            await axios.delete(`http://localhost:8084/admin/turfs/${turfId}`);
            setDeleteDialog({ open: false, turfId: null });
            setSnackbar({ open: true, message: 'Turf deleted successfully' });
            fetchData();
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete turf' });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                <Typography 
                    variant="h3" 
                    align="center"
                    sx={{ 
                        color: 'white',
                        mb: 6,
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    <SportsIcon sx={{ fontSize: 45, mr: 2 }} />
                    Available Turfs
                </Typography>

                <Grid container spacing={4}>
                    {turfs.map((turf, index) => (
                        <Grid item xs={12} md={6} lg={4} key={turf.turfId}>
                            <Fade in={true} timeout={500 + index * 100}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                                        },
                                        borderRadius: 4,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={turfImages[index % turfImages.length]}
                                        alt={turf.turfName}
                                    />
                                    <CardContent>
                                        <Typography 
                                            variant="h5" 
                                            gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {turf.turfName}
                                        </Typography>

                                        <Box sx={{ mb: 2 }}>
                                            <Chip 
                                                icon={<MoneyIcon />}
                                                label={`₹${turf.turfAmount}/hr`}
                                                color="primary"
                                                sx={{ mr: 1, mb: 1 }}
                                            />
                                            <Chip 
                                                icon={<DescriptionIcon />}
                                                label={turf.turfType}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        </Box>

                                        <Box sx={{ 
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            mb: 2
                                        }}>
                                            <LocationIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {turf.turfAdd}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ 
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            mt: 2
                                        }}>
                                            <IconButton
                                                color="error"
                                                onClick={() => setDeleteDialog({ 
                                                    open: true, 
                                                    turfId: turf.turfId 
                                                })}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {turfs.length === 0 && !loading && (
                    <Box 
                        sx={{ 
                            textAlign: 'center',
                            py: 8
                        }}
                    >
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: 'white',
                                opacity: 0.8
                            }}
                        >
                            No Turfs Available
                        </Typography>
                    </Box>
                )}

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        component={Link}
                        to="/profile/admin"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            backgroundColor: '#1a237e',
                            '&:hover': {
                                backgroundColor: '#0d47a1'
                            }
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Box>

            <Dialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, turfId: null })}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this turf?
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setDeleteDialog({ open: false, turfId: null })}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleDelete(deleteDialog.turfId)}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
}