// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './list.css';

// export default function ManagerListUnderAdmin() {
//     const [users, setusers] = useState([]);
//     const user = "user";
    
//     const fetchData = async () => {
//         const result = await Axios.get("http://localhost:8084/admin/managers");
//       console.log(result.data);
//         setusers(result.data);
//     }
    
//     const deleteUser = async managerId => {
//         await Axios.delete(`http://localhost:8084/admin/inactive/${managerId}`);
//         alert(`${managerId} is inactive now `);
//         fetchData();
//       };
    
//       useEffect(() => {
//         fetchData();
//     }, [])
    
//     return (
//         <div>
//            <h1 class="display-6 text-center text-white mb-4">Manager List</h1>
//             <React.Fragment>
//                 <div>
//                     {users.length > 0 ?
//                         <table className="jumbotron table shadow-lg table-dark table-striped tb">
//                             <thead>
//                                 <tr>
//                                     <th>ManagerId</th>
//                                     <th>FirstName</th>
//                                     <th>LastName</th>
//                                     <th>ContactNo</th>
//                                     <th>EmailId</th>
//                                     <th>Available</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     users.map((user) => (
//                                         <tr key={user.managerId}>
//                                             <td>{user.managerId}</td>
//                                             <td>{user.firstName}</td>
//                                             <td>{user.lastName}</td>
//                                             <td>{user.contactNo}</td>
//                                             <td>{user.emailId}</td>
//                                             <td>{user.active.toString().toUpperCase()}</td>
//                                             <td>         
//                                                 <Link
//                                                     class="btn btn-outline-primary mr-2"
//                                                     to={`/admin/edit/${user.managerId}`}
//                                                 >
//                                                     Edit
//                                                 </Link>
                                                
//                                                 <Link     
//                                                     class="btn btn-danger"                                               
//                                                     onClick={() => {
//                                                         const confirmBox = window.confirm(
//                                                         "Do you really want to delete this record?"
//                                                         )
//                                                         if (confirmBox === true) {
//                                                             deleteUser(user.managerId)                               
//                                                         }
//                                                     }}
//                                                     to={`/admin/managerlist/${user.managerId}`}                                              
//                                                 >
//                                                     Delete
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                         : 
//                         <h1 class="display-6 text-center text-white mb-4">No Manager List is Available</h1>
//                     }</div>
//                     <Link className="btn btn-primary btn-dark mb-4 tb" to="/profile/admin">
//                         Back  
//                     </Link> &nbsp; &nbsp; &nbsp;

//             </React.Fragment>
//         </div>
//     )
// }




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    Box,
    Avatar,
    Fade,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';

export default function ManagerListUnderAdmin() {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, managerId: null });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await axios.get("http://localhost:8084/admin/managers");
            setManagers(result.data);
        } catch (err) {
            setError("Failed to load managers list");
            setSnackbar({ open: true, message: 'Failed to load managers' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (managerId) => {
        try {
            await axios.delete(`http://localhost:8084/admin/inactive/${managerId}`);
            setDeleteDialog({ open: false, managerId: null });
            setSnackbar({ open: true, message: 'Manager deactivated successfully' });
            fetchData(); // Refresh the list
        } catch (err) {
            setError("Failed to deactivate manager");
            setSnackbar({ open: true, message: 'Failed to deactivate manager' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

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
                    Manager Directory
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {managers.map((manager, index) => (
                        <Grid item xs={12} md={6} lg={4} key={manager.managerId}>
                            <Fade in={true} timeout={500 + index * 100}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.2)'
                                        },
                                        position: 'relative',
                                        overflow: 'visible',
                                        borderRadius: 3
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            zIndex: 1
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: manager.active ? '#4caf50' : '#f44336',
                                                border: '4px solid white',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                fontSize: '2rem'
                                            }}
                                        >
                                            {manager.firstName[0]}{manager.lastName[0]}
                                        </Avatar>
                                    </Box>

                                    <CardContent sx={{ pt: 8 }}>
                                        <Typography 
                                            variant="h5" 
                                            align="center" 
                                            gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {manager.firstName} {manager.lastName}
                                        </Typography>

                                        <Typography 
                                            variant="body2" 
                                            color="textSecondary" 
                                            align="center"
                                            gutterBottom
                                        >
                                            ID: {manager.managerId}
                                        </Typography>

                                        <Box sx={{ 
                                            mt: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1
                                        }}>
                                            <EmailIcon color="action" />
                                            <Typography variant="body2">
                                                {manager.emailId}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ 
                                            mt: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1
                                        }}>
                                            <PhoneIcon color="action" />
                                            <Typography variant="body2">
                                                {manager.contactNo}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ 
                                            mt: 3,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 2
                                        }}>
                                            <Button
                                                component={Link}
                                                to={`/admin/edit/${manager.managerId}`}
                                                variant="outlined"
                                                startIcon={<EditIcon />}
                                                size="small"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                size="small"
                                                onClick={() => setDeleteDialog({ 
                                                    open: true, 
                                                    managerId: manager.managerId 
                                                })}
                                            >
                                                Deactivate
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {managers.length === 0 && (
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
                            No Managers Available
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
                onClose={() => setDeleteDialog({ open: false, managerId: null })}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>Confirm Deactivation</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to deactivate this manager? This action can be reversed later.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 1 }}>
                    <Button 
                        onClick={() => setDeleteDialog({ open: false, managerId: null })}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleDelete(deleteDialog.managerId)}
                        color="error"
                        variant="contained"
                    >
                        Deactivate
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </Container>
    );
}