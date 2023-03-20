// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const corsOptions = {
//     origin: "http://localhost:3000/api/graphql",
//     credentials: true
//   };

// const client = new ApolloClient({
//     uri: "localhost:3000/api/graphql",
//     cache: new InMemoryCache(),
//     cors: corsOptions
// });

// export default client;

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "localhost:3000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: ``
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;