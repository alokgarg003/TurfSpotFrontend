
// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { useHistory, useParams } from "react-router-dom";

// const EditUserDetails = () => {
//   let history = useHistory();
//   const { userId } = useParams();
//   const [user, setUser] = useState({
//     userId :"",
//     firstName: "",
//     lastName: "",
//     contactNo: "",
//     emailId: ""
   
   
//   });

//   const {firstName, lastName,contactNo,emailId} = user;
//   const onInputChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const onSubmit = async e => {
//     e.preventDefault();
//     await Axios.put(`http://localhost:8080/managers/users/${userId}`, user);
//     history.push("/profile/userlist");
//   };

//   const loadUser = async () => {
//     const result = await Axios.get(`http://localhost:8080/managers/users/${userId}`);
//     console.log(result)
//     setUser(result.data);
//   };
//   return (
//     <div className="container">
//       <div className="w-75 mx-auto shadow p-5">
//         <h2 className="text-center mb-4">Edit User Profile</h2>
//         <form onSubmit={e => onSubmit(e)}>
//         <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="User Id"
//               name="userId"
//               value={userId}
//               disabled={true}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               className="form-control form-control-lg"
//               placeholder="Enter Your E-mail Address"
//               name="emailId"
//               value={emailId}
//               disabled={true}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your firstName"
//               name="firstName"
//               value={firstName}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your lastname"
//               name="lastName"
//               value={lastName}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
         
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your Phone Number"
//               name="contactNo"
//               value={contactNo}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <button className="btn btn-warning btn-block">Update Profile</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserDetails;





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
    Alert,
    Fade
} from '@mui/material';
import {
    PersonOutline as PersonIcon,
    Save as SaveIcon
} from '@mui/icons-material';

const EditUserDetails = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        contactNo: "",
        emailId: ""
    });

    const { firstName, lastName, contactNo, emailId } = user;

    useEffect(() => {
        loadUser();
    }, [userId]);

    const loadUser = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`http://localhost:8080/managers/users/${userId}`);
            setUser(result.data);
        } catch (err) {
            setError("Failed to load user details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError(null);
    };

    const validateForm = () => {
        if (!firstName.trim()) return "First name is required";
        if (!lastName.trim()) return "Last name is required";
        if (!contactNo.trim()) return "Contact number is required";
        if (!/^\d{10}$/.test(contactNo)) return "Please enter a valid 10-digit contact number";
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setSaveLoading(true);
            await axios.put(`http://localhost:8080/managers/users/${userId}`, user);
            setSuccess(true);
            setTimeout(() => {
                history.push("/profile/userlist");
            }, 1500);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaveLoading(false);
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
        <Container maxWidth="sm">
            <Fade in={true} timeout={800}>
                <Paper 
                    elevation={3}
                    sx={{
                        p: 4,
                        mt: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                >
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mb: 3
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                        <Typography variant="h4" component="h1" color="primary">
                            Edit Profile
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Profile updated successfully!
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="User ID"
                            name="userId"
                            value={userId}
                            disabled
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email Address"
                            name="emailId"
                            type="email"
                            value={emailId}
                            disabled
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            label="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={onInputChange}
                            variant="outlined"
                            autoFocus
                        />

                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={onInputChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            label="Contact Number"
                            name="contactNo"
                            value={contactNo}
                            onChange={onInputChange}
                            variant="outlined"
                            inputProps={{
                                pattern: "[0-9]*",
                                maxLength: 10
                            }}
                            helperText="Please enter a 10-digit contact number"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={saveLoading}
                            startIcon={<SaveIcon />}
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                height: 48
                            }}
                        >
                            {saveLoading ? <CircularProgress size={24} /> : 'Update Profile'}
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
};

export default EditUserDetails;


