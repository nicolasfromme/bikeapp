import { ApolloClient, InMemoryCache } from "@apollo/client";

const corsOptions = {
    origin: "http://localhost:3000/api/graphql",
    credentials: true
  };

const client = new ApolloClient({
    uri: "localhost:3000/api/graphql",
    cache: new InMemoryCache(),
    cors: corsOptions
});

export default client;