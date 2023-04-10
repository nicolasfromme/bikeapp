"use client"
import React from "react";
import { use } from "react"
import { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import { getClient } from "../../apolloclient";

import StoreData from "../../../components/storedata"

import Box from '@mui/material/Box';

export default function Dashboard() {
    const [store, setStore] = useState("")
    const { loading, error, data } = useQuery(gql`
        {
            getBikeStores {
                id
                name
            }
        }
    `);

    if (loading) return <p>Loading...</p>;

    return (
        <Selection store={store} options={data} />
    )
}

function Selection({store, options}) {
        
    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id={`select-option-label-${id}`}>Option</InputLabel>
                    <Select
                        labelId={`select-option-label-${id}`}
                        id={`select-option-${id}`}
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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