"use client"
import { use } from "react"
import { useState } from "react";

import { gql } from "@apollo/client";
import { getClient } from "../../apolloclient";

import StoreData from "../../../components/storedata"

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from "@mui/material/Autocomplete";

import TextField from '@mui/material/TextField';


export default function Dashboard() {
    const dataRaw = use(fetch_data())
    console.log(dataRaw.props.data.getBikeStores)
    const data = dataRaw.props.data

    const [store, setStore] = useState({})


    const [value, setValue] = useState({});

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <Box style={{height: "300px", padding: "25px"}}>
            <h1>Dashboard</h1>
            <div>
                <h2>Where do u wanna go:</h2>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-label">Select a store:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Select a store"
                            id="demo-simple-select"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                        >
                            <MenuItem value="Test">Test</MenuItem>
                            <MenuItem value="Test2">Test2</MenuItem>
                            <MenuItem value="Test3">Test3</MenuItem>
                            {data.getBikeStores.map((store) => (   
                                <MenuItem key={store.id} value={store.name}>{store.name}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
                <Autocomplete 
                    disablePortal
                    options={data.getBikeStores}
                    renderInput={(params) => <Select
                        {...params}
                        label="Stadt"
                      />}
                />


                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
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