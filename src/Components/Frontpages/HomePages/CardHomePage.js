// import React from 'react';
// import { Button, Card, CardGroup  } from 'react-bootstrap';
// import newdog from '../../../images/cricket.jpg';
// import newdog2 from '../../../images/hockey.jpg';
// import c1 from '../../../images/c1.jpg';
// import c2 from '../../../images/c2.jpg';
// import c3 from '../../../images/c3.jpg';
// import c4 from '../../../images/c4.jpg';
// import c5 from '../../../images/c5.jpg';
// import './Card.css';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";


// function CardHomePage() {

// const responsive = {
//     superLargeDesktop: {
//         // the naming can be any, depends on you.
//         breakpoint: { max: 4000, min: 3000 },
//         items: 5
//     },
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 3
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 2
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1
//     }
// };

// return(
   
//         <Carousel
//             swipeable={false}
//             draggable={false}
//             showDots={true}
//             responsive={responsive}
//             ssr={true} // means to render carousel on server-side.
//             infinite={true}
//             autoPlaySpeed={1000}
//             keyBoardControl={true}
//             customTransition="all .5"
//             transitionDuration={500}
//             containerClass="carousel-container"
//             removeArrowOnDeviceType={["tablet", "mobile"]}
//             dotListClass="custom-dot-list-style"
//             itemClass="carousel-item-padding-40-px"
//         >

//             <div className="Card text-white" >
//                 <img
//                 className="d-block w-100"
//                 src={c1}
//                 alt="card1"
//                 style={{borderRadius:20 , height:200}}
//                 />
//                 <h3>Football</h3>
//                 <p>Don’t just chase your dreams…run them down!</p>
//             </div>

//             <div className="Card text-white">
//                 <img
//                 className="d-block w-100"
//                 src={c2}
//                 alt="card2"
//                 style={{borderRadius:20 , height:200}}
//                 />
//                 <h3>Cricket</h3>
//                 <p>Life is short, Play Hard!</p>
//             </div>

//             <div className="Card text-white">
//                 <img
//                 className="d-block w-100"
//                 src={c3}
//                 alt="card3"
//                 style={{borderRadius:20 , height:200}}
//                 />
//                 <h3>Tennis</h3>
//                 <p>Don’t race against others, race against yourself!</p>
//             </div>

//             <div className="Card text-white">
//                 <img
//                 className="d-block w-100"
//                 src={c4}
//                 alt="card4"
//                 style={{borderRadius:20 , height:200}}
//                 />
//                 <h3>Golf</h3>
//                 <p>Get your Game on</p>
//             </div>

//             <div className="Card text-white">
//                 <img
//                 className="d-block w-100"
//                 src={c5}
//                 alt="card5"
//                 style={{borderRadius:20 , height:200}}
//                 />
//                 <h3>Hockey</h3>
//                 <p>For the love of the Game</p>
//             </div>

//         </Carousel> ); 
// }

// export default CardHomePage;





import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

// Import your images
import c1 from '../../../images/c1.jpg';
import c2 from '../../../images/c2.jpg';
import c3 from '../../../images/c3.jpg';
import c4 from '../../../images/c4.jpg';
import c5 from '../../../images/c5.jpg';

const CardHomePage = () => {
    const carouselItems = [
        {
            image: c1,
            title: "Football",
            description: "Don't just chase your dreams…run them down!"
        },
        {
            image: c2,
            title: "Cricket",
            description: "Life is short, Play Hard!"
        },
        {
            image: c3,
            title: "Tennis",
            description: "Don't race against others, race against yourself!"
        },
        {
            image: c4,
            title: "Golf",
            description: "Get your Game on"
        },
        {
            image: c5,
            title: "Hockey",
            description: "For the love of the Game"
        }
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 12, mb: 4 }}>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="transform 500ms ease-in-out"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    sx={{
                        '& .react-multi-carousel-dot-list': {
                            bottom: '-50px'
                        }
                    }}
                >
                    {carouselItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                px: 2,
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    borderRadius: 4,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)'
                                    },
                                    backgroundColor: 'transparent',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{
                                        borderRadius: '16px 16px 0 0',
                                        objectFit: 'cover'
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: 'rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography 
                                        variant="h5" 
                                        component="h3"
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: 1
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="body1"
                                        sx={{
                                            fontSize: '1rem',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </Container>
    );
};

export default CardHomePage;