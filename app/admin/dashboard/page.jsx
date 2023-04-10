"use client"
import React from "react"
import { useState } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
//import client from "../../apolloclient"

export default function Dashboard() {
    const [store, setStore] = useState("")
    const handleChangeStore = (event) => {
        setStore(event.target.value)
    }
    
    const { data, loading, error } = useQuery(gql`
        query {
            getBikeStores {
                id
                name
            }
        }
    `)
    if (loading) return <div>Loading...</div>

    return (
        <Box sx={{height: "600px", paddingLeft: "15px"}}>
            <Typography variant="h4" sx={{color: "#000000"}}>Dashboard</Typography>
            <Typography variant="p" sx={{color: "#000000"}}>Select a Store</Typography>
            <Selector sx={{}} options = {data} handleChange = {handleChangeStore} store = {store} />
        </Box>
    )
}

function Selector({ options, handleChange, store }) {

    return (
        <Box sx={{ paddingTop: "20px", flexGrow: 1 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel sx={{backgroundColor: "#FFF"}}>Option</InputLabel>
                        <Select
                            value={store}
                            onChange={handleChange}
                        >
                            {options.getBikeStores.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
    )
}