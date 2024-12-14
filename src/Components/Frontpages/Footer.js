// import React from "react";
// import './frontPage.css';

// const Footer = () => (
//   <footer className="text-sm px-8 text-center flex-none py-4 change-clr">
//    <p className="text-white">
//    Copyright @ TUrf Management System is reserver By Capgemini(Tanya&Alok){' '}
//     <a
//      href="/"
//      target="_blank"
//      rel="noopener noreferrer"
//     >
    
//     </a>
//    </p>
//    <div className="p-2 mt-4" id="faqs">
//     <a
//      rel="noopener noreferrer"
//      className="bg-mid-purple hover:bg-light-blue text-white hover:text-mid-blue px-2 py-1 pointer no-underline text-sm"
//      href="/Faq"
//     >
//     <i class="fas fa-question"/> FAQs
//     </a>
//    </div>
//   </footer>
//  )
// export default Footer;

import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  Link,
  Stack,
  Button,
  TextField,
  Divider,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  Help,
  Copyright,
  Email,
  Phone,
  LocationOn,
  KeyboardArrowUp,
  SportsSoccer,
  WhatsApp
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerStyle = {
    backgroundColor: '#0A1929', // Dark blue professional color
    color: 'white',
    position: 'relative',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)'
    }
  };

  const socialButtonStyle = {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: theme.spacing(0.5),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#4CAF50',
      transform: 'translateX(5px)'
    }
  };

  return (
    <Box component="footer" sx={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontWeight: 'bold',
                mb: 2 
              }}>
                <SportsSoccer sx={{ fontSize: 30 }} />
                TurfSpot
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                Your premier destination for booking sports facilities. 
                Experience seamless turf booking and management services.
              </Typography>
            </Box>
            
            {/* Contact Info */}
            <Stack spacing={2}>
              <Link href="tel:+911234567890" sx={linkStyle}>
                <Phone /> +91 123 456 7890
              </Link>
              <Link href="mailto:contact@turfspot.com" sx={linkStyle}>
                <Email /> contact@turfspot.com
              </Link>
              <Typography variant="body2" sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1,
                color: 'rgba(255,255,255,0.7)' 
              }}>
                <LocationOn />
                123 Sports Complex, Tech Park,<br />
                Mumbai, Maharashtra 400001
              </Typography>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Link href="/about" sx={linkStyle}>About Us</Link>
                  <Link href="/services" sx={linkStyle}>Services</Link>
                  <Link href="/pricing" sx={linkStyle}>Pricing</Link>
                  <Link href="/contact" sx={linkStyle}>Contact</Link>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Link href="/booking" sx={linkStyle}>Book Now</Link>
                  <Link href="/facilities" sx={linkStyle}>Facilities</Link>
                  <Link href="/terms" sx={linkStyle}>Terms</Link>
                  <Link href="/privacy" sx={linkStyle}>Privacy</Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
              Subscribe to our newsletter for exclusive offers and updates.
            </Typography>
            <Box component="form" noValidate sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                  },
                }}
              />
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 1,
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Social Links */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={socialButtonStyle} aria-label="facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={socialButtonStyle} aria-label="twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={socialButtonStyle} aria-label="instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={socialButtonStyle} aria-label="linkedin">
                <LinkedIn />
              </IconButton>
              <IconButton 
                sx={socialButtonStyle} 
                aria-label="whatsapp"
                href="https://wa.me/911234567890"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Bar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Copyright sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
            {currentYear} TurfSpot. All rights reserved by Capgemini (Tanya & Alok)
          </Typography>

          <Stack direction="row" spacing={2} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Link href="/faq" sx={linkStyle}>
              <Help fontSize="small" /> FAQs
            </Link>
            <Link href="/support" sx={linkStyle}>Support</Link>
          </Stack>
        </Box>

        {/* Scroll to Top Button */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#4CAF50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#45a049'
            },
            zIndex: 1000
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Container>
    </Box>
  );
};

export default Footer;