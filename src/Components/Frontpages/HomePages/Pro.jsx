// import React from 'react'

// export default function Pro() {
//     return (
//         <div>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-xs-12 col-sm-6 col-md-6">
//                         <div className="well well-sm">
//                             <div className="row">
                                
//                                 <div className="col-sm-6 col-md-8">
//                                     <h4>
//                                         Alok Garg</h4>
//                                     <small><cite title="San Francisco, USA">San Francisco, USA <i className="glyphicon glyphicon-map-marker">
//                                     </i></cite></small>
//                                     <p>
//                                         <i className="glyphicon glyphicon-envelope"></i>email@example.com
//                             <br />
//                                         <i className="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
//                                         <br />
//                                         <i className="glyphicon glyphicon-gift"></i>June 02, 1988</p>

//                                     <div className="btn-group">
//                                         <button type="button" className="btn btn-primary">
//                                             Social</button>
//                                         <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
//                                             <span className="caret"></span><span className="sr-only">Social</span>
//                                         </button>
//                                         <ul className="dropdown-menu" role="menu">
//                                             <li><a href="#">Twitter</a></li>
//                                             <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
//                                             <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
//                                             <li className="divider"></li>
//                                             <li><a href="#">Github</a></li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>


//     )
// }


import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Button,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    Link
} from '@mui/material';
import {
    LocationOn,
    Email,
    Language,
    Cake,
    Twitter,
    Facebook,
    GitHub,
    Google,
    Share as ShareIcon
} from '@mui/icons-material';

export default function Pro() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card 
                elevation={3}
                sx={{
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }}
            >
                <CardContent>
                    <Box 
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: '#1a237e',
                                fontSize: '3rem',
                                border: '4px solid white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}
                        >
                            AG
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                            <Typography 
                                variant="h4" 
                                component="h1"
                                sx={{ 
                                    fontWeight: 'bold',
                                    mb: 1
                                }}
                            >
                                Alok Garg
                            </Typography>

                            <Box sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2,
                                color: 'text.secondary'
                            }}>
                                <LocationOn fontSize="small" />
                                <Typography variant="body2">
                                    San Francisco, USA
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Email fontSize="small" color="action" />
                                    <Link 
                                        href="mailto:email@example.com"
                                        underline="hover"
                                        color="inherit"
                                    >
                                        email@example.com
                                    </Link>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Language fontSize="small" color="action" />
                                    <Link 
                                        href="http://www.jquery2dotnet.com"
                                        underline="hover"
                                        color="inherit"
                                        target="_blank"
                                    >
                                        www.jquery2dotnet.com
                                    </Link>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Cake fontSize="small" color="action" />
                                    <Typography variant="body2">
                                        June 02, 1988
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ShareIcon />}
                                    onClick={handleClick}
                                    sx={{
                                        bgcolor: '#1a237e',
                                        '&:hover': {
                                            bgcolor: '#0d47a1'
                                        }
                                    }}
                                >
                                    Social Links
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: { borderRadius: 2 }
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Twitter sx={{ mr: 1 }} /> Twitter
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Google sx={{ mr: 1 }} /> Google+
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Facebook sx={{ mr: 1 }} /> Facebook
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <GitHub sx={{ mr: 1 }} /> Github
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}