"use client"
import ResponsiveAppBar from 'app/responsive_header';
import { Box, Grid, Link, Typography } from '@mui/material';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
export default function RootLayout({ children }) {

  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

  return (
    <html lang="en">
      <body >
        <ApolloProvider client={client}>
        <ResponsiveAppBar className='text-black' ></ResponsiveAppBar>

        <Box className='bg-white' sx={{ maxWidth: '2100px', margin: '0 auto' }}>

          {children}

        </Box>
        </ApolloProvider>
      </body>
    </html>
  )
}