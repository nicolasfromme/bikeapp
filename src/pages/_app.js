// pages/_app.js
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

