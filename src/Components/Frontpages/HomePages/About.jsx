import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Paper,
    Chip
} from '@mui/material';
import {
    Help as WhyIcon,
    HowToReg as RegisterIcon,
    Login as LoginIcon,
    Payment as PaymentIcon
} from '@mui/icons-material';


const AboutCard = ({ title, description, imageSrc, icon }) => (
    <Paper 
        elevation={3}
        sx={{
            mb: 3,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-5px)',
            }
        }}
    >
        <Card>
            <CardContent>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Box
                                component="img"
                                src={imageSrc}
                                alt={title}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    border: '3px solid #1a237e',
                                    mb: 2
                                }}
                            />
                            {icon}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography 
                            variant="h5" 
                            component="h2" 
                            gutterBottom 
                            sx={{ 
                                color: '#1a237e',
                                fontWeight: 'bold'
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography 
                            variant="body1"
                            sx={{
                                fontSize: '1.1rem',
                                color: '#424242'
                            }}
                        >
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Paper>
);

export default function About() {
    const aboutData = [
        {
            title: "Why us?",
            description: "We provide you real time turf booking system without going officials. You can book your favorite turf according to your suitable timing.",
            imageSrc: "https://bootdey.com/img/Content/avatar/avatar7.png",
            icon: <WhyIcon sx={{ fontSize: 40, color: '#1a237e', mt: 1 }} />
        },
        {
            title: "Register with us",
            description: "Just go to our sign up page fill simple form. Give your some basic information and you are good to go.",
            imageSrc: "https://bootdey.com/img/Content/avatar/avatar3.png",
            icon: <RegisterIcon sx={{ fontSize: 40, color: '#1a237e', mt: 1 }} />
        },
        {
            title: "Login",
            description: "Welcome to 'The Dugout' here you can look for the playground, where you want to play with your friends and family and you can instantly book it.",
            imageSrc: "https://bootdey.com/img/Content/avatar/avatar6.png",
            icon: <LoginIcon sx={{ fontSize: 40, color: '#1a237e', mt: 1 }} />
        },
        {
            title: "How to pay",
            description: "Just choose your favorite turf and click on book now button, this will redirect you to payment page. \"JUST BOOK AND PLAY\".",
            imageSrc: "https://bootdey.com/img/Content/avatar/avatar2.png",
            icon: <PaymentIcon sx={{ fontSize: 40, color: '#1a237e', mt: 1 }} />
        }
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                py: 4
            }}
        >
            <Container maxWidth="lg">
                <Typography 
                    variant="h3" 
                    component="h1" 
                    align="center" 
                    gutterBottom
                    sx={{
                        color: '#1a237e',
                        fontWeight: 'bold',
                        mb: 4
                    }}
                >
                    About Our Service
                </Typography>
                
                {aboutData.map((item, index) => (
                    <AboutCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        imageSrc={item.imageSrc}
                        icon={item.icon}
                    />
                ))}
            </Container>
        </Box>
    );
}