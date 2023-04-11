// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = () => {

    const client = new ApolloClient({
        uri: "http://localhost:3000/api/graphql",
        cache: new InMemoryCache(),
    });
    return client
}
