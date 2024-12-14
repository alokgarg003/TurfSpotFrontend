// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './list.css';

// export default function Userlist() {
//     const [users, setusers] = useState([]);
//     const user = "user";

//     const fetchData = async () => {
//        // const result = await Axios.get("http://localhost:8084/managers");
//        const result = await Axios.get("http://localhost:8084/managers/users");
//         console.log(result.data);
//         setusers(result.data);
//     }

//     const deleteUser = async userId => {
//         await Axios.delete(`http://localhost:8084/managers/users/${userId}`);
//         alert(`${userId} is inactive now `);
//         //loadUsers();
//         fetchData();
//     };

//     useEffect(() => {
//         fetchData();
//     }, [])

//     return (
//         <div>
//             <h1 class="display-6 text-center text-white mb-4">User List</h1>
//             <React.Fragment>
//                 <div>
//                     {users.length > 0 ?
//                         <table className="jumbotron table shadow-lg table-dark table-striped tb">
//                             <thead>
//                                 <tr>
//                                     <th>UserId</th>
//                                     <th>FirstName</th>
//                                     <th>LastName</th>
//                                     <th>ContactNo</th>
//                                     <th>EmailId</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     users.map((user) => (
//                                         <tr key={user.userId}>
//                                             <td>{user.userId}</td>
//                                             <td>{user.firstName}</td>
//                                             <td>{user.lastName}</td>
//                                             <td>{user.contactNo}</td>
//                                             <td>{user.emailId}</td>
//                                             <td>
//                                                 <Link     
//                                                     class="btn btn-danger"                                               
//                                                     onClick={() => {
//                                                         const confirmBox = window.confirm(
//                                                         "Do you really want to delete this record?"
//                                                         )
//                                                         if (confirmBox === true) {
//                                                             deleteUser(user.userId)                               
//                                                         }
//                                                     }}
//                                                     to={`/profile/userlist/${user.userId}`}                                              
//                                                 >
//                                                     Delete
//                                                 </Link>
                                                
//                                             </td>

//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                         : <h1 class="display-6 text-center text-white mb-4">No User List is Available!</h1>
//                     }</div>
//                     <Link className="btn btn-dark mb-4 tb" to="/profile/admin">
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
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Avatar,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fade,
    Snackbar
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as PersonIcon
} from '@mui/icons-material';

export default function Userlist() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await axios.get("http://localhost:8084/managers/users");
            setUsers(result.data);
        } catch (err) {
            setError("Failed to load user list");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8084/managers/users/${userId}`);
            setDeleteDialog({ open: false, userId: null });
            setSnackbar({ open: true, message: `User ${userId} has been deactivated` });
            fetchData();
        } catch (err) {
            setError("Failed to delete user");
        }
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
                    User Directory
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {users.map((user, index) => (
                        <Grid item xs={12} sm={6} md={4} key={user.userId}>
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
                                        borderRadius: 4,
                                        overflow: 'visible'
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
                                                bgcolor: '#1a237e',
                                                border: '4px solid white',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                fontSize: '2rem'
                                            }}
                                        >
                                            {user.firstName[0]}{user.lastName[0]}
                                        </Avatar>
                                    </Box>

                                    <CardContent sx={{ pt: 8 }}>
                                        <Typography 
                                            variant="h5" 
                                            align="center" 
                                            gutterBottom
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {user.firstName} {user.lastName}
                                        </Typography>

                                        <Box sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            mb: 1
                                        }}>
                                            <EmailIcon color="action" fontSize="small" />
                                            <Typography variant="body2" color="text.secondary">
                                                {user.emailId}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            mb: 3
                                        }}>
                                            <PhoneIcon color="action" fontSize="small" />
                                            <Typography variant="body2" color="text.secondary">
                                                {user.contactNo}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ 
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <IconButton
                                                color="error"
                                                onClick={() => setDeleteDialog({ 
                                                    open: true, 
                                                    userId: user.userId 
                                                })}
                                                sx={{
                                                    '&:hover': {
                                                        transform: 'scale(1.1)'
                                                    }
                                                }}
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

                {users.length === 0 && (
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
                            No Users Available
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
                onClose={() => setDeleteDialog({ open: false, userId: null })}
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setDeleteDialog({ open: false, userId: null })}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleDelete(deleteDialog.userId)}
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