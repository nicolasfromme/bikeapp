"use client"
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { getClient } from "../../../../apolloclient";

export default function Store( { data }) {
    const router = useRouter();
    const { store } = router.query;

    
    console.log(data)
    return (
        <div>
            <h1>Store: {store}</h1>
        </div>
    );
}

async function getStaticProps( ) {
    const { data, loading } = await client.query({
        query: gql`
        {
        getCustomers{
            firstname
            lastname
            email
            phone
            street
            city
            state
            zip
        } getEmployeesByStore(storeId: store){
            firstname
            lastname
            email
            phone
            street
            city
            state
            zip
            position
        }
        }
        `,
    });
    console.log(data)
    return {
        props: {
        users: data,
        },
    };
}