"use client"
import React from "react";
import { useState } from "react";
import { Box, Drawer, ListItem, List, Toolbar, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useMutation, gql } from "@apollo/client";

export default function StoreDashboard() {
    const [selectedItem, setSelectedItem] = useState("Bikes");
    
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
            {selectedItem === "Bikes" ? showBikes() : null}
            {selectedItem === "Add Bike" ? addBike() : null}
            {selectedItem === "Show Employees" ? showEmployees() : null}
            {selectedItem === "Add Employee" ? addEmployee() : null}
        </Box>
    </Box>);
}

function addBike({id}) {
    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Add Bike
            </Typography>
        </Box>
    )
}

function addEmployee({id}) {
    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Add Employee
            </Typography>
        </Box>
    )
}

function showEmployees({id}) {
    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Show Employees
            </Typography>
        </Box>
    )
}

function showBikes({id}) {
    
    const GET_BIKES = gql`
    query getBikesByStore(storeId: ${id}) {
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
    `;
    const { loading, error, data } = useQuery(GET_BIKES);
    if (loading) return <p>Loading...</p>;
    
    //console.log(data)

    return(
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Show Bikes
            </Typography>
        </Box>
    )
}