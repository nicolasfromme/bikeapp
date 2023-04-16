"use client"
import React from "react";
import { useState } from "react";
import { Box, Drawer, ListItem, List, Toolbar, ListItemButton, ListItemIcon, Button, ListItemText, Divider, Typography, FormGroup, TextField } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid"


export default function StoreDashboard() {
    const [selectedItem, setSelectedItem] = useState("Show Employees");

    const id = "641a5d18c7230e02939bb551"
    
    const handleBarChange = (selectedValue) => {
        setSelectedItem(selectedValue)
    }

     
  return (
    <Box sx={{display: "flex"}}>
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
                        <ListItem key={"Bikes"}>
                            <ListItemButton selected={selectedItem === "Bikes"} onClick={() => setSelectedItem("Bikes")}>
                            <ListItemIcon>
                                <TrendingUpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Show Bikes"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={"Add Bike"} >
                            <ListItemButton selected={selectedItem === "Add Bike"} onClick={() => handleBarChange("Add Bike")}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Add Bike"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={"Show Employees"} >
                            <ListItemButton selected={selectedItem === "Show Employees"} onClick={() => handleBarChange("Show Employees")}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Show Employees"} />
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {selectedItem === "Bikes" ? <ShowBikes id={id} /> : null}
            {selectedItem === "Add Bike" ? <AddBike id={id} /> : null}
            {selectedItem === "Show Employees" ? <ShowEmployees id={id} /> : null}
            {selectedItem === "Add Employee" ? <AddEmployee id={id} /> : null}
        </Box>
    </Box>);
}

function AddBike({id}) {
    const [bikeData, setBikeData] = useState({
        type: "",
        brand: "",
        model: "",
        year: "",
        color: "",
        price: "",
        description: "",
        rented: false
    });

    const ADD_BIKE = gql`
    mutation { addBike(input: {type: "${bikeData.type}", brand: "${bikeData.brand}", model: "${bikeData.model}", year: "${bikeData.year}", color: "${bikeData.color}", price: "${bikeData.price}", description: "${bikeData.description}", rented: ${bikeData.rented}, bikeStore: "${id}"}) {
        type
    }
    }
    `;

    const handleChange = (evt) => {
        const value = evt.target.value;
        setBikeData({
          ...bikeData,
          [evt.target.name]: value
        });
    }

    const [addBike] = useMutation(ADD_BIKE);
    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Add Bike
            </Typography>
            <Box>
                <FormGroup row="true">
                    <TextField id="outlined-basic" name="type" required onChange={handleChange} value={bikeData.type} sx={{paddingRight: "10px"}} margin="normal" label="Bike Type" variant="outlined" />
                    <TextField id="outlined-basic" name="brand" required onChange={handleChange} value={bikeData.brand} sx={{paddingRight: "10px"}} margin="normal" label="Bike Brand" variant="outlined" />
                    <TextField id="outlined-basic" name="model" required onChange={handleChange} value={bikeData.model} sx={{paddingRight: "10px"}} margin="normal" label="Bike Model" variant="outlined" />
                    <TextField id="outlined-basic" name="year" required onChange={handleChange} value={bikeData.year} sx={{paddingRight: "10px"}} margin="normal" label="Bike Year" variant="outlined" />
                    <TextField id="outlined-basic" name="color" required onChange={handleChange} value={bikeData.color} sx={{paddingRight: "10px"}} margin="normal" label="Bike Color" variant="outlined" />
                    <TextField id="outlined-basic" name="price" required onChange={handleChange} value={bikeData.price} sx={{paddingRight: "10px"}} margin="normal" label="Bike Price" variant="outlined" />
                    <TextField id="outlined-basic" name="description" required onChange={handleChange} value={bikeData.description} sx={{paddingRight: "10px"}} margin="normal" label="Bike Description" variant="outlined" />
                    <TextField id="outlined-basic" name="rented" required onChange={handleChange} disabled value={bikeData.rented} sx={{paddingRight: "10px"}} margin="normal" label="Bike Rented" variant="outlined" />
                </FormGroup>
                <Button variant="outlined" onClick={addBike}>Add Bike</Button>
            </Box>
        </Box>
    )
}

function AddEmployee({id}) {
    const [employeeData, setEmployeeData] = useState({
        employeeFirstName: "",
        employeeLastName: "",
        employeeStreet: "",
        employeeCity: "",
        employeeState: "",
        employeeZipCode: "",
        employeeEmail: "",
        employeePhoneNumber: "",
        employeePosition: ""
    });

    const ADD_EMPLOYEE = gql`
    mutation { addEmployee(input: { firstname: "${employeeData.employeeFirstName}", lastname: "${employeeData.employeeLastName}", email: "${employeeData.employeeEmail}", phone: "${employeeData.employeePhoneNumber}", street: "${employeeData.employeeStreet}", city: "${employeeData.employeeCity}", state: "${employeeData.employeeState}", zip: "${employeeData.employeeZipCode}", position: "${employeeData.employeePosition}", storeId: "${id}" }) {
        firstname
    }
    }
    `;
    const [addEmployee] = useMutation(ADD_EMPLOYEE);

    const handleChange = (evt) => {
        const value = evt.target.value;
        setEmployeeData({
          ...employeeData,
          [evt.target.name]: value
        });
    }
    
    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Add Employee
            </Typography>
            <Box>
                <FormGroup row="true">
                        <TextField id="outlined-basic" name="employeeFirstName" required onChange={handleChange} value={employeeData.employeeFirstName} sx={{paddingRight: "10px"}} margin="normal" label="Employee First Name" variant="outlined" />
                        <TextField id="outlined-basic" name="employeeLastName" onChange={handleChange} value={employeeData.employeeLastName} sx={{paddingRight: "10px"}} margin="normal" label="Employee Last Name" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="employeeStreet" onChange={handleChange} value={employeeData.employeeStreet} sx={{paddingRight: "10px"}} margin="normal" label="Employee Street" variant="outlined" />
                        <TextField id="outlined-basic" name="employeeCity" onChange={handleChange} value={employeeData.employeeCity} sx={{paddingRight: "10px"}} margin="normal" label="Employee City" variant="outlined" />
                        <TextField id="outlined-basic" name="employeeState" onChange={handleChange} value={employeeData.employeeState} sx={{paddingRight: "10px"}} margin="normal" label="Employee State" variant="outlined" />
                        <TextField id="outlined-basic" name="employeeZipCode" onChange={handleChange} value={employeeData.employeeZipCode} sx={{paddingRight: "10px"}} margin="normal" label="Employee Zip Code" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="employeeEmail" onChange={handleChange} value={employeeData.employeeEmail} sx={{paddingRight: "10px"}} margin="normal" label="Employee Email" variant="outlined" />
                        <TextField id="outlined-basic" name="employeePhoneNumber" onChange={handleChange} value={employeeData.employeePhoneNumber} sx={{paddingRight: "10px"}} margin="normal" label="Employee Phone Number" variant="outlined" />
                    </FormGroup>
                    <FormGroup row="true">
                        <TextField id="outlined-basic" name="employeePosition" sx={{paddingRight: "10px"}} margin="normal" onChange={handleChange} value={employeeData.employeePosition} label="Role" variant="outlined" />
                    </FormGroup>
                    <Button variant="outlined" onClick={addEmployee}>Add Store</Button>
            </Box>
        </Box>
    )
}

function ShowEmployees({id}) {
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

    const GET_EMPLOYEES = gql`
    query { getEmployeesByStore(storeId: "${id}") {
        id
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
    `;
    const { loading, error, data } = useQuery(GET_EMPLOYEES);
    if (loading) return <p>Loading...</p>;


    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Show Employees
            </Typography>
            <div style={{ height: 300, width: '73%' }}>
                <DataGrid rows={data.getEmployeesByStore} columns={columns_employees} pageSize={5} />
            </div>
        </Box>
    )
}

function ShowBikes({id}) {
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
    
    const { loading, error, data } = useQuery(gql`
    query { getBikesByStore(storeId: "${id}") {
        id
        type
        brand
        model
        year
        color
        price
        description
        rented
    }
    }
    `);
    if (loading) return <p>Loading...</p>;
    
    //console.log(data)

    return(
        <Box>
            <Typography variant="h6">Bikes in this store: </Typography>
            <div style={{ height: 300, width: '73%' }}>
                <DataGrid rows={data.getBikesByStore} columns={columns_bikes} pageSize={5} />
            </div>
        </Box>
    )
}