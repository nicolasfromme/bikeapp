import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "locolhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

export default client;