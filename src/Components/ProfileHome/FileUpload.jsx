// import axios from 'axios';
// import { contains } from 'jquery';
// import React, { Fragment, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';


// const user={"userName": "Aadhi","userEmail" :"Sakthi",
// "createdDate": "today","imagemessage":"testing for image content"}


// function FileUpload() {
//     const formData=new FormData();
//     const email = useSelector(state => state.loginState.user.email)
//     const [file, setFile] = useState('');
//     const [filename, setFilename] = useState('Choose File');
//     const [uploadedFile,setuploadedFile]=useState({});
//     const [userdata, setuserdata] = useState({});
//     const [text, settext] = useState("");
//     const onChangeHandler =async(e)=>{
//         setFile(e.target.files[0]);
//         setFilename(e.target.files[0].name);
//         try{
                    
//         }catch(error){
//             console.log(error.response);
//         }
//     }




//     useEffect(async() => {
//         const result = await axios.get(`http://localhost:8080/api/unauthuser/getuser/${email}`);
//         let date=new Date();
//         console.log(date);
//         let curdate=date.toString;
//         console.log(curdate);
//         console.log(result);
//         const obj={"userName": result.data.name,"userEmail" :email,"createdDate":"curdate","imagemessage":"testing for image content"}
       
//         setuserdata(JSON.stringify(obj));
        
//         console.log(result);
//     }, [])




//     const onSubmitHandler=async(e)=>{
//         let obj={}
//         e.preventDefault();
       
//         console.log(file);
//         console.log("in submit");
//         formData.append('file',file);
   
//         formData.append("user",userdata);
//         try{                                                                                            
//         const res=await axios({method:"post",url:'http://localhost:8080/api/unauthuser/upload',data:formData,headers:{
//             'Content-Type': 'multipart/form-data'
//         }})
//         console.log(res);
//     }catch(error){
//         console.log(error);
//     }
    
        


//     }

//     return (
//         <Fragment>
//             <form onSubmit={onSubmitHandler}>
//                 <div className='custom-file mb4'>
//                     <input type='file' className='custom-file-label' id='customFile'
//                     onChange={onChangeHandler}
//                     />
//                     <label className='custom-file-label' htmlFor="customFile">
//                         {filename}
//                     </label>
//                 </div>

//                 <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
//             </form>
//             <div className="create">
//       <div className="create__first">
//         <div className="create__first-input">
//           <input
//             type="text"
//             className="create__first-inputs"
//             placeholder="Share what are your mind? "
//             onChange={e=>settext(e.target.value) }  value={text}
//           />
//         </div>
//       </div>
//       </div>
//         </Fragment>

    
//     )
// }

// export default FileUpload


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CloudUpload,
  Image,
  Close,
  Send,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const UploadInput = styled('input')({
  display: 'none',
});

const PreviewImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const UploadCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
}));

function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [userData, setUserData] = useState(null);

  const email = useSelector(state => state.loginState.user.email);

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const fetchUserData = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/unauthuser/getuser/${email}`);
      const currentDate = new Date().toISOString();
      
      const userObj = {
        userName: result.data.name,
        userEmail: email,
        createdDate: currentDate,
        imagemessage: "testing for image content"
      };
      
      setUserData(userObj);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAlert({
        open: true,
        message: 'Failed to fetch user data',
        severity: 'error'
      });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file && !text) {
      setAlert({
        open: true,
        message: 'Please select a file or enter some text',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (userData) formData.append('user', JSON.stringify(userData));
    if (text) formData.append('text', text);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/unauthuser/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            // Handle upload progress if needed
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log('Upload Progress:', percentCompleted);
          },
        }
      );

      setAlert({
        open: true,
        message: 'File uploaded successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFile(null);
      setPreview('');
      setText('');
    } catch (error) {
      console.error('Upload error:', error);
      setAlert({
        open: true,
        message: 'Failed to upload file',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <UploadCard elevation={3}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom color="primary">
            Share Your Thoughts
          </Typography>

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* File Upload */}
          <Box sx={{ mb: 3 }}>
            <label htmlFor="file-upload">
              <UploadInput
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                component="span"
                startIcon={<Image />}
                sx={{ mr: 2 }}
              >
                Choose Image
              </Button>
            </label>

            {file && (
              <Typography variant="body2" color="textSecondary">
                Selected: {file.name}
              </Typography>
            )}
          </Box>

          {/* Image Preview */}
          {preview && (
            <Box sx={{ mb: 3, position: 'relative' }}>
              <PreviewImage src={preview} alt="Preview" />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
                onClick={() => {
                  setFile(null);
                  setPreview('');
                }}
              >
                <Close sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          )}

          {/* Loading Progress */}
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<Send />}
            fullWidth
          >
            {loading ? 'Uploading...' : 'Share Post'}
          </Button>
        </form>
      </UploadCard>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
          elevation={6}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FileUpload;