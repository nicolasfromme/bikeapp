"use client"
import './globals.css'
import ResponsiveAppBar from './responsive_header'
import { Box, Grid, Link, Typography } from '@mui/material';
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        <ResponsiveAppBar className='text-black' ></ResponsiveAppBar>
        <Box className='bg-white' sx={{ maxWidth: '2100px', margin: '0 auto' }}>
          {children}
          <Footer />
        </Box>
      </body>
    </html>
  )
}


function Footer() {
  return (
    <Box sx={{ bgcolor: '#121212', color: '#fff', py: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Kontakt
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="mailto:info@meinefahrradvermietung.de" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              info@meinefahrradvermietung.de
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="tel:+1234567890" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              +12 345 678 90
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Folge uns
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="#" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              Facebook
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="#" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              Instagram
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Rechtliches
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="#" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              Datenschutz
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="#" sx={{ color: '#fff', '&:hover': { color: '#fff' } }}>
              Impressum
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}