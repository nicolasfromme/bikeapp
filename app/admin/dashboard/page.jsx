"use client"
import React from "react";
import { use } from "react"
import { useState } from "react";

import { gql } from "@apollo/client";
import { getClient } from "../../apolloclient";

import StoreData from "../../../components/storedata"

import Box from '@mui/material/Box';

export default function Dashboard() {
    const [store, setStore] = useState()
    const dataRaw = use(fetch_data())
    console.log(dataRaw.props.data.getBikeStores)
    const data = dataRaw.props.data

    console.log("store:   " + store)

    function handleChange(event) {
        console.log("handleChange")
        setStore(event.value);
    };


    return (
        <Box style={{height: "700px", padding: "25px"}}>
            <h1>Dashboard</h1>
            <div>
            <h2>Select a store:</h2>
                <form method="POST">
                    <input type="text" name="store" value={store} onChange={handleChange} />
                    
                </form>
                {store ? <StoreData/> : null}
            </div>
        </Box>
    )
}

async function fetch_data() {
    const apolloClient = getClient()
    const { data } = await apolloClient.query({
        query: gql`
                getBikeStores {
                    id
                    name
                }
            
        `,
    });
    return {
        props: {
            data,
        },
    };
}