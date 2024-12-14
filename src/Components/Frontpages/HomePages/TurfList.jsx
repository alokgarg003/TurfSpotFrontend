// import React from 'react'
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// export default function TurfList() {
//     const [users, setusers] = useState([]);
//     const user = "user";
//     const fetchData = async () => {
//        // const result = await Axios.get("http://localhost:8080/turf/all");
//         const result = await Axios.get("http://localhost:8080/managers/users");
//         console.log(result.data);
//         setusers(result.data);
//     }
//     const deleteUser = async userId => {
//         await Axios.delete(`http://localhost:8084/managers/users/${userId}`);
//         fetchData();
//       };
//     useEffect(() => {

//         fetchData();
//     }, [])
//     return (
//         <div>
//             <h1 class="display-6 text-center text-white mb-4">Turf List</h1>
//             <h1>User List</h1>
//             <React.Fragment>

//                 <div>
//                     {users.length > 0 ?
//                         <table className=" jumbotron table table-bordered shadow-lg m-5">
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
//                                                     class="btn btn-outline-primary mr-2"
//                                                     to={`/profile/edit/${user.userId}`}
//                                                 >
//                                                     Edit
//                                                 </Link>
//                                                 <Link
//                                                     class="btn btn-danger"
//                                                     onClick={() => deleteUser(user.userId)}
//                                                    to={`/profile/userlist/${user.userId}`}
//                                                 >
//                                                     Delete
//                                                 </Link>
//                                             </td>

//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                         : <h1>No User List is Available</h1>
//                     }</div>

//             </React.Fragment>
//         </div>
//     )
// }



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Box,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tooltip,
    Fade
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon
} from '@mui/icons-material';

export default function TurfList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null });

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
                    variant="h4" 
                    component="h1" 
                    align="center"
                    sx={{ 
                        color: 'white',
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <PersonIcon fontSize="large" />
                    User List
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {users.length > 0 ? (
                    <Fade in={true}>
                        <TableContainer 
                            component={Paper} 
                            sx={{ 
                                borderRadius: 2,
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)'
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#1a237e' }}>
                                        <TableCell sx={{ color: 'white' }}>User ID</TableCell>
                                        <TableCell sx={{ color: 'white' }}>First Name</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Contact No</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Email ID</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow 
                                            key={user.userId}
                                            sx={{ 
                                                '&:hover': { 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                                                }
                                            }}
                                        >
                                            <TableCell>{user.userId}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.contactNo}</TableCell>
                                            <TableCell>{user.emailId}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Tooltip title="Edit User">
                                                        <IconButton 
                                                            component={Link}
                                                            to={`/profile/edit/${user.userId}`}
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete User">
                                                        <IconButton
                                                            color="error"
                                                            size="small"
                                                            onClick={() => setDeleteDialog({ 
                                                                open: true, 
                                                                userId: user.userId 
                                                            })}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Fade>
                ) : (
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{ color: 'white', opacity: 0.8 }}
                    >
                        No Users Available
                    </Typography>
                )}
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
                    Are you sure you want to delete this user? This action cannot be undone.
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
        </Container>
    );
}
