// import React from 'react';

// import { Button, Card,  Carousel} from 'react-bootstrap';
// import f1 from '../../../images/f1.jpeg';
// import f2 from '../../../images/f2.jpeg';
// import f3 from '../../../images/f3.jpeg';

// import './Coursel.css';
// import "react-multi-carousel/lib/styles.css";
 
// export default function ControlledCarousel(){
    
//     return(
//         <Carousel>

//           <Carousel.Item style={{width:1200 , alignContent:'center', marginLeft:80 }}>
//             <img
//               className="d-block w-100 imgset"
//               src={f1}
//               alt="First slide" 
//             />
//             <Carousel.Caption>
//               <h1 class="display-1">Cricket</h1>
//               <p class="rounded-pill t">Add sports in your daily life !</p>
//               <p class="rounded-pill t">The Dugout is an online platform to connect sports facilities to its users, <br></br> We're breaking down barriers to getting more people active</p>
//             </Carousel.Caption>
//           </Carousel.Item>

//           <Carousel.Item style={{width:1200, alignContent:'center', marginLeft:80}}>
//             <img
//               className="d-block w-100 imgset"
//               src={f2}
//               alt="Second slide"
//             />
//             <Carousel.Caption>
//               <h1 class="display-1">Football</h1>
//               <p class="rounded-pill t">Meet your pals over game !</p>
//               <p class="rounded-pill t">Want to play, but don't get an opponent team? <br></br> You can invite your friends or Join a pre scheduled match through The Dugout</p>
//             </Carousel.Caption>
//           </Carousel.Item>

//           <Carousel.Item style={{width:1200, alignContent:'center', marginLeft:80}}>
//             <img
//               className="d-block w-100 imgset"
//               src={f3}
//               alt="Third slide"
//             />
//             <Carousel.Caption>
//               <h1 class="display-1">Tennis</h1>
//               <p class="rounded-pill t" >Play More, Pay Less !</p>
//               <p class="rounded-pill t" >Register yourself and book your turf now</p>
//             </Carousel.Caption>
//           </Carousel.Item>

//         </Carousel>

//     );
 
// }



import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Carousel } from 'react-bootstrap';
import { styled } from '@mui/system';

// Import images
import f1 from '../../../images/f1.jpeg';
import f2 from '../../../images/f2.jpeg';
import f3 from '../../../images/f3.jpeg';

const StyledCarousel = styled(Box)(({ theme }) => ({
    '.carousel': {
        marginBottom: theme.spacing(4),
    },
    '.carousel-item': {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '.carousel-caption': {
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        bottom: '20%',
    },
    '.gradient-text': {
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
    },
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        }
    }
}));

const CarouselImage = styled('img')({
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '20px',
});

const carouselItems = [
    {
        image: f1,
        title: "Cricket",
        subtitle: "Add sports in your daily life !",
        description: "The Dugout is an online platform to connect sports facilities to its users. We're breaking down barriers to getting more people active"
    },
    {
        image: f2,
        title: "Football",
        subtitle: "Meet your pals over game !",
        description: "Want to play, but don't get an opponent team? You can invite your friends or Join a pre scheduled match through The Dugout"
    },
    {
        image: f3,
        title: "Tennis",
        subtitle: "Play More, Pay Less !",
        description: "Register yourself and book your turf now"
    }
];

export default function ControlledCarousel() {
    return (
        <Container maxWidth="xl">
            <StyledCarousel>
                <Carousel 
                    fade 
                    indicators={true}
                    interval={5000}
                    controls={true}
                >
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: '80vh',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                }}
                            >
                                <CarouselImage
                                    src={item.image}
                                    alt={item.title}
                                />
                                <Carousel.Caption>
                                    <Typography 
                                        variant="h1" 
                                        className="gradient-text"
                                        sx={{
                                            fontSize: { xs: '2.5rem', md: '4rem' },
                                            mb: 2
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="h4"
                                        sx={{
                                            color: 'white',
                                            mb: 2,
                                            fontSize: { xs: '1.5rem', md: '2rem' }
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                    <Typography 
                                        variant="body1"
                                        sx={{
                                            color: 'white',
                                            fontSize: { xs: '1rem', md: '1.2rem' },
                                            maxWidth: '800px',
                                            margin: '0 auto'
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Carousel.Caption>
                            </Box>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </StyledCarousel>
        </Container>
    );
}

