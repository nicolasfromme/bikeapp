"use client"

import React from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function Admin() {
    
    return (
        <Box>
            <h1>Manage your store</h1>
            <Button>Check out the Bikes</Button>
            <Button>Check out your Empolyees</Button>
            <Button>Check out your Orders</Button>
        </Box>
    );
}