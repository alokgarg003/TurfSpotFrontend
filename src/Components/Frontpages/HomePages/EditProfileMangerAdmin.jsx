// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { useHistory, useParams } from "react-router-dom";

// const EditProfileMangerAdmin = () => {
//   let history = useHistory();
//   const { managerId } = useParams();
//   const [user, setUser] = useState({
//     managerId :"",
//     firstName: "",
//     lastName: "",
//     contactNo: "",
//     emailId: ""
   
   
//   });

//   const { firstName,lastName,contactNo,emailId} = user;
//   const onInputChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const onSubmit = async e => {
//     e.preventDefault();
//     await Axios.put(`http://localhost:8084/admin/update/${managerId}`, user);
//     alert("Manager updated successfully");
//     history.push("/admin/managerlist");
//   };

//   const loadUser = async () => {
//     const result = await Axios.get(`http://localhost:8084/admin/manager/${managerId}`);
//     console.log(result)
//     setUser(result.data);
//   };
//   return (
//     <div className="container bg-transparent">
//       <div className="w-75 mx-auto shadow p-5">
//       <h1 class="display-6 text-center text-white mb-4">Edit Manager Details</h1>
//         <form onSubmit={e => onSubmit(e)}>

//         <div className="form-group">
//         <label className="text-black"> Manager Id </label>       
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="User Id"
//               name="managerId"
//               value={managerId}
//               disabled={true}
//               onChange={e => onInputChange(e)}
//             />
//           </div>

//           <div className="form-group">
//           <label className="text-black"> First Name </label>     
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter first name"
//               name="firstName"
//               value={firstName}
//               disabled={true}
//               onChange={e => onInputChange(e)}
//             />
//           </div>

//           <div className="form-group">
//           <label className="text-black"> Last Name </label>     
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Last Name"
//               name="lastName"
//               value={lastName}
//               onChange={e => onInputChange(e)}
//             />
//           </div>

//           <div className="form-group">
//           <label className="text-black">Contact No. </label>   
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your contact No."
//               name="contactNo"
//               value={contactNo}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
         
//           <div className="form-group">
//          <label className="text-black"> Email Id </label> 
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter turf manager id"
//               name="emailId"
//               value={emailId}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <button className="btn btn-dark btn-block mt-4">Update Manager</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileMangerAdmin;



import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const EditProfileManagerAdmin = () => {
    const history = useHistory();
    const { managerId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        managerId: "",
        firstName: "",
        lastName: "",
        contactNo: "",
        emailId: ""
    });

    const { firstName, lastName, contactNo, emailId } = user;

    useEffect(() => {
        loadUser();
    }, [managerId]);

    const loadUser = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`http://localhost:8084/admin/manager/${managerId}`);
            setUser(result.data);
        } catch (err) {
            setError("Failed to load manager details");
            console.error("Error loading user:", err);
        } finally {
            setLoading(false);
        }
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`http://localhost:8084/admin/update/${managerId}`, user);
            history.push("/admin/managerlist");
        } catch (err) {
            setError("Failed to update manager details");
            console.error("Error updating user:", err);
        } finally {
            setLoading(false);
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
        <Container maxWidth="md">
            <Paper 
                elevation={3}
                sx={{
                    p: 4,
                    mt: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2
                }}
            >
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom
                    sx={{
                        color: '#1a237e',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    <EditIcon /> Edit Manager Details
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box 
                    component="form" 
                    onSubmit={onSubmit}
                    sx={{
                        '& .MuiTextField-root': { mb: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <TextField
                        fullWidth
                        label="Manager ID"
                        name="managerId"
                        value={managerId}
                        disabled
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        disabled
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={onInputChange}
                        variant="outlined"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Contact Number"
                        name="contactNo"
                        value={contactNo}
                        onChange={onInputChange}
                        variant="outlined"
                        required
                        inputProps={{
                            pattern: "[0-9]{10}",
                            title: "Please enter a valid 10-digit phone number"
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Email ID"
                        name="emailId"
                        value={emailId}
                        onChange={onInputChange}
                        variant="outlined"
                        required
                        type="email"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            backgroundColor: '#1a237e',
                            '&:hover': {
                                backgroundColor: '#0d47a1'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Update Manager'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditProfileManagerAdmin;