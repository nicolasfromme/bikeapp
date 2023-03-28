import { use } from "react"
import { gql } from "@apollo/client";
import { getClient } from "../apolloclient";

export default function About() {
    const data = use(query_stores())
    console.log(data.props.data)
    return (
        <div>
            <h1 className="text-black">Store:</h1>
            <ul className="text-black">
                {data.props.data.getBikeStores.map(store => (
                    <li key={store.id}>{store.name}</li>
                ))}
            </ul>
        </div>

    )
}

async function query_stores() {
    const apolloClient = getClient()
    const { data } = await apolloClient.query({
        query: gql`
            {
                getBikeStores {
                    id
                    name
                }
            }
        `,
    });
    return {
        props: {
            data,
        },
    };
}