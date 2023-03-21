/*import { ApolloClient, InMemoryCache } from "@apollo/client";

const corsOptions = {
    origin: "localhost:3000/api/graphql",
    credentials: true
  };

const client = new ApolloClient({
    uri: "localhost:3000/api/graphql",
    cache: new InMemoryCache(),
    cors: corsOptions
});
*/
import { ApolloClient, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    uri: 'http://localhost:4000/graphql', // replace with your backend URI
    cache: new InMemoryCache(),
    fetch: fetch,
  });
}

export default function initApolloClient() {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }

  return apolloClient;
}

