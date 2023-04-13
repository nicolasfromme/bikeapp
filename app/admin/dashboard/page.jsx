"use client"
import React from "react"
import { useState } from "react"
import { Box, FormControl, FormGroup, TextField, InputLabel, MenuItem, Select, Typography, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, List, Divider, Button } from "@mui/material"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';

import { useQuery, useMutation, gql } from "@apollo/client"
import { DataGrid } from "@mui/x-data-grid"

export default function Dashboard() {
    const [store, setStore] = useState("")
    const [storeId, setStoreId] = useState("")
    const [selectedItem, setSelectedItem] = useState("Analytics")

    const handleBarChange = (selectedValue) => {
        setSelectedItem(selectedValue)
    }

    const handleChangeStore = (e) => {
        setStore(e.target.value)
        for (let val of data.getBikeStores) {
            if (val.name == e.target.value) {
                setStoreId(val.id)
            }
        }
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
        <Box sx={{display: "flex", bgcolor: "#FFF"}}>
            <Drawer
                variant="permanent"
                sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>

                    <List>
                        <ListItem key={"Analytics"}>
                            <ListItemButton selected={selectedItem === "Analytics"} onClick={() => handleBarChange("Analytics")}>
                            <ListItemIcon>
                                <TrendingUpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Analytics"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={"Add Employee"} >
                            <ListItemButton selected={selectedItem === "Add Employee"} onClick={() => handleBarChange("Add Employee")}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Add Employee"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#FFFFFF" }}>
                <Toolbar />
                {selectedItem == "Analytics" &&
                <div>
                    <Typography variant="h4" sx={{color: "#000000"}}>Dashboard</Typography>
                    <Typography variant="p" sx={{color: "#000000"}}>Select a Store</Typography>
                    <Selector sx={{}} options = {data} handleChange = {handleChangeStore} store = {store} storeId={storeId} />
                    {store && <StoreData storeId={storeId} />}
                </div>
                }
                {selectedItem == "Add Employee" &&
                <div>
                    <Typography variant="h4" sx={{color: "#000000"}}>Add Store</Typography>
                    <AddEmployee />
                </div>
                }                     
                
            </Box>
        </Box>
    )
}

function AddEmployee() {

    const [callMutation, { data, loading, error }] = useMutation(gql`
        mutation {
            addBikeStore(input: {
                name: ${StoreData.name},
                city: ${StoreData.city},
                street: ${StoreData.street},
                state: ${StoreData.state},
                zip: ${StoreData.zipCode},
                phone: ${StoreData.phoneNumber},
                email: ${StoreData.email},
                location: {
                    long: ${StoreData.locationLong},
                    lat: ${StoreData.locationLat}
                },
                employee: {
                    firstName: ${StoreData.employeeFirstName}, 
                    lastName: ${StoreData.employeeLastName},
                    street: ${StoreData.employeeStreet},
                    city: ${StoreData.employeeCity},
                    state: ${StoreData.employeeState},
                    zip: ${StoreData.employeeZipCode},
                    phone: ${StoreData.employeePhoneNumber},
                    email: ${StoreData.employeeEmail},
                    position: ${StoreData.employeePosition}
                }
            }) {
                id
                name
            }
        }
    `)

    const [storeData, setStoreData] = useState({
        name: "",
        city: "",
        street: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        locationLong: "",
        locationLat: "",
        employeeFirstName: "",
        employeeLastName: "",
        employeeStreet: "",
        employeeCity: "",
        employeeState: "",
        employeeZipCode: "",
        employeePhoneNumber: "",
        employeeEmail: "",
        employeePosition: "Manager",
    })

    const handleChange = (evt) => {
        const value = evt.target.value;
        setStoreData({
          ...storeData,
          [evt.target.name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        callMutation()
    }

    console.log(storeData)

    return (
        <Box sx={{ height: "100%", paddingBottom: "200px", width: "100%", flexGrow: 1}}>
            <Typography variant="p" sx={{color: "#000000"}}>Fill out the following form to create a new store</Typography>
            <Box sx={{ paddingTop: "20px", flexGrow: 1 }}>
                <Box sx={{ border: "1px solid #000", borderRadius: "5px", padding: "10px" }}>
                    <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.name} margin="normal" label="Name" variant="outlined" />
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="city" onChange={handleChange} value={storeData.city} sx={{paddingRight: "10px"}} margin="normal" label="City" variant="outlined" />
                        <TextField id="outlined-basic" name="street" onChange={handleChange} value={storeData.street} sx={{paddingRight: "10px"}} margin="normal" label="Street" variant="outlined" />
                        <TextField id="outlined-basic" name="state" onChange={handleChange} value={storeData.state} sx={{paddingRight: "10px"}} margin="normal" label="State" variant="outlined" />
                        <TextField id="outlined-basic" name="zipCode" onChange={handleChange} value={storeData.zipCode} sx={{paddingRight: "10px"}} margin="normal" label="Zip Code" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.phoneNumber} sx={{paddingRight: "10px"}} margin="normal" label="Phone Number" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.email} sx={{paddingRight: "10px"}} margin="normal" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.locationLong} sx={{paddingRight: "10px"}} margin="normal" label="Location: Long" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.locationLat} sx={{paddingRight: "10px"}} margin="normal" label="Location: Lat" variant="outlined" />
                    </FormGroup>
                    <Divider sx={{ height: "10px"}} />
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeFirstName} sx={{paddingRight: "10px"}} margin="normal" label="Employee First Name" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeLastName} sx={{paddingRight: "10px"}} margin="normal" label="Employee Last Name" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeStreet} sx={{paddingRight: "10px"}} margin="normal" label="Employee Street" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeCity} sx={{paddingRight: "10px"}} margin="normal" label="Employee City" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeState} sx={{paddingRight: "10px"}} margin="normal" label="Employee State" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeZipCode} sx={{paddingRight: "10px"}} margin="normal" label="Employee Zip Code" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeeEmail} sx={{paddingRight: "10px"}} margin="normal" label="Employee Email" variant="outlined" />
                        <TextField id="outlined-basic" name="" onChange={handleChange} value={storeData.employeePhoneNumber} sx={{paddingRight: "10px"}} margin="normal" label="Employee Phone Number" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" sx={{paddingRight: "10px"}} margin="normal" disabled defaultValue="Manager" label="Role" variant="outlined" />
                    </FormGroup>
                    <Button variant="outlined" onClick={handleSubmit}>Add Store</Button>
                </Box>
            </Box>
        </Box>
    )
}

function Selector({ options, handleChange, store, storeId }) {

    return (
        <Box sx={{ paddingTop: "20px", flexGrow: 1 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel sx={{backgroundColor: "#FFF"}}>Option</InputLabel>
                        <Select
                            value={store}
                            onChange={handleChange}
                        >
                            {options.getBikeStores.map((option) => (
                                <MenuItem key={option.id} data-id={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
    )
}


function StoreData({ storeId }) {
    const { data, loading, error } = useQuery(gql`
        query {
            getBikesByStore(storeId: "${storeId}") {
                id
                type
                brand
                model
                year
                color
                price
                description
                rented
            } getOrdersByStore(storeId: "${storeId}") {
                customer
                bike
                date
                price
            } getEmployeesByStore(storeId: "${storeId}") {
                id
            }
        }
    `)
    if (loading) return <div>Loading...</div>
    console.log(data)
                
    const columns_bikes = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "type", headerName: "Type", width: 200 },
        { field: "brand", headerName: "Brand", width: 200 },
        { field: "model", headerName: "Model", width: 250 },
        { field: "year", headerName: "Year", width: 200 },
        { field: "color", headerName: "Color", width: 200 },
        { field: "price", headerName: "Price", width: 200 },
        { field: "description", headerName: "Description", width: 200 },
        { field: "rented", headerName: "Rented", width: 200 }
    ]

    const columns_orders = [
        { field: "customer", headerName: "Customer", width: 300 },
        { field: "bike", headerName: "Bike", width: 200 },
        { field: "date", headerName: "Date", width: 200 },
        { field: "price", headerName: "Price", width: 250 },
    ]

    const columns_employees = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "firstname", headerName: "First Name", width: 200 },
        { field: "lastname", headerName: "Last Name", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phone", headerName: "Phone", width: 200 },
        { field: "street", headerName: "Street", width: 200 },
        { field: "city", headerName: "City", width: 200 },
        { field: "zipcode", headerName: "Zipcode", width: 200 },
        { field: "country", headerName: "Country", width: 200 },
        { field: "position", headerName: "Position", width: 200 },
    ]


    return (
        <Box sx={{bgcolor: "#FFF", paddingBottom: "200px"}}>
            <Typography>Bikes in this store: </Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data.getBikesByStore} columns={columns_bikes} pageSize={5} />
            </div>

            <Typography>Orders made in this store: </Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data.getBikesByStore} columns={columns_orders} pageSize={5} />
            </div>

            <Typography>Employees working in this store: </Typography>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data.getBikesByStore} columns={columns_employees} pageSize={5} />
            </div>
        </Box>
    )
}

//<DataGrid rows={data} columns={columns} pageSize={5} />