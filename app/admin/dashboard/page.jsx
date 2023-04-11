"use client"
import React from "react"
import { useState } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
import { DataGrid } from "@mui/x-data-grid"

export default function Dashboard() {
    const [store, setStore] = useState("")
    const [storeId, setStoreId] = useState("")

    const handleChangeStore = (event) => {
        let obj = JSON.parse(e.target.value) 
        console.log(obj)
        setStore(event.target.value)
        console.log(event.target.getAttribute('data-key'));
        setStoreId(event.target.data-key)
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
    console.log(data)

    return (
        <Box sx={{height: "600px", paddingLeft: "15px"}}>
            <Typography variant="h4" sx={{color: "#000000"}}>Dashboard</Typography>
            <Typography variant="p" sx={{color: "#000000"}}>Select a Store</Typography>
            <Selector sx={{}} options = {data} handleChange = {handleChangeStore} store = {store} storeId={storeId} />
            {store && <StoreData />}
        </Box>
    )
}

function Selector({ options, handleChange, store, storeId }) {

    const { data, loading, error } = useQuery(gql`
        query {
            getBikesByStore(storeId: "${storeId}") {
                id
            }
        }
    `)
    if (loading) return <div>Loading...</div>

    return (
        <Box sx={{ paddingTop: "20px", flexGrow: 1 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel sx={{backgroundColor: "#FFF"}}>Option</InputLabel>
                        <Select
                            value={store}
                            onChange={handleChange}
                        >
                            {options.getBikeStores.map((option) => (
                                <MenuItem key={option.id} value={JSON.stringify({key: option.id, value: option.value})}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
    )
}


function StoreData({ store }) {
    const data = [{
        id: 1,
        store: "Lindenhof bikestore",
        number_employees: 5,
        number_customers: 10,
        number_bikes_available: 20,
        number_rented: 30,
    },
    {
        id: 2,
        store: "Quadrate bikestore",
        number_employees: 8,
        number_customers: 15,
        number_bikes_available: 25,
        number_rented: 35,
    },
    {
        id: 3,
        store: "Bikestore 3",
        number_employees: 10,
        number_customers: 20,
        number_bikes_available: 30,
        number_rented: 40,  
    }]
                
    const columns = [
        { field: "store", headerName: "Name", width: 300 },
        { field: "number_employees", headerName: "Number of Employees", width: 200 },
        { field: "number_customers", headerName: "Number of Customers", width: 200 },
        { field: "number_bikes_available", headerName: "Number of Bikes Available", width: 250 },
        { field: "number_rented", headerName: "Number of Bikes Rented", width: 200 },
    ]

    return (
        <div>
            <Typography>StoreData for {data[0].store}</Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}