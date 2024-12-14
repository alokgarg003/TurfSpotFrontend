// import React from 'react';


// function ViewProfileUser() {
//     return (
  
        
//         <div class="container rounded bg-white mt-5 mb-5 form-group">
            
//                 <div class="row ">
               
//                     <div class="col-md-4 border-right ">
//                      </div>
//                 <div class="col-md-5 border-right border border-danger text-danger">
                
//                         <div class="p-3 py-5">
//                             <div class="d-flex justify-content-center align-items-center mb-3">
//                                 <h2 class="text-right text-dark font-weight-bold">Profile Settings</h2>
                               
//                             </div>
//                             <div class="row mt-3">
//                                 <div class="col-md-12"><label class="labels">Full Name</label><input type="text" class="form-control" placeholder="Full name" value="" /></div>
                               
//                             </div>
//                             <div class="row mt-3">
//                                 <div class="col-md-12"><label class="labels">PhoneNumber</label><input type="text" class="form-control" placeholder="enter phone number" value="" /></div>
//                                 <div class="col-md-12"><label class="labels">Address</label><input type="text" class="form-control" placeholder="enter address" value="" /></div>
//                                 <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value="" /></div>
//                             <div class="col-md-12"><label class="labels">Old Password</label><input type="text" class="form-control" placeholder="Old Password" value="" /></div>
//                             <div class="col-md-12"><label class="labels">New Password</label><input type="text" class="form-control" placeholder="New Password" value="" /></div>
//                             </div>
                            
//                             <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
           

       


//         )

//     }
//     export default ViewProfileUser;

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  PhotoCamera,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  border: '2px solid #FF6B6B',
  background: 'rgba(255, 255, 255, 0.95)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  border: '4px solid #FF6B6B',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#FF6B6B',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF6B6B',
    },
  },
}));

function ViewProfileUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <ProfilePaper elevation={0}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ position: 'relative', mb: 3 }}>
            <StyledAvatar src="/path-to-profile-image.jpg" />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#FF6B6B',
                '&:hover': {
                  backgroundColor: '#FF5252',
                },
              }}
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: '#FF6B6B',
            mb: 4,
          }}>
            Profile Settings
          </Typography>

          <StyledTextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            variant="outlined"
          />

          <StyledTextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
          />

          <StyledTextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={2}
          />

          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />

          <StyledTextField
            fullWidth
            label="Old Password"
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            variant="outlined"
          />

          <StyledTextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            sx={{
              mt: 2,
              backgroundColor: '#FF6B6B',
              '&:hover': {
                backgroundColor: '#FF5252',
              },
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Save Profile
          </Button>
        </Box>
      </ProfilePaper>
    </Container>
  );
}

export default ViewProfileUser;