// pages/_app.js
// show data about the bike store: bikes rented, bikes available, employees, etc.
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from "@apollo/client";
import client from "./apolloclient";

export default function App({ Component, pageProps }) {
  
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}