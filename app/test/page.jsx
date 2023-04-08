"use client"
import { use } from "react"
import { gql } from "@apollo/client";
import { getClient } from "../apolloclient";
import { useState } from "react";

import StoreData from "../../components/storedata"

import Box from '@mui/material/Box';

export default function About() {
    const dataRaw = use(fetch_data())
    console.log(dataRaw.props.data.getBikeStores)
    const data = dataRaw.props.data
    
    const [store, setStore] = useState();


    const [value, setValue] = useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <Box style={{height: "300px", padding: "25px"}}>
            <h1>Dashboard</h1>
            <div>

                <h2>Select a store:</h2>
                <form>
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={value} onChange={handleChange}>
                        <option value="" disabled selected>Select a store</option>
                        {data.getBikeStores.map((store) => (
                            <option value={store.id} onClick={() => setStore(store.id)}>{store.name}</option>
                        ))}
                    </select>
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