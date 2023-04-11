"use client"
import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { pink } from '@mui/material/colors';
import { gql, useMutation } from "@apollo/client";
import { Divider, Grid, Box, TextField, Button, Paper, FormControlLabel, Radio, RadioGroup, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { CreditCard, Payment, MonetizationOn } from "@mui/icons-material";
import { use } from 'react';
import { getClient } from "app/apolloclient";

import { useQuery } from '@apollo/client';


const libraries = ["places"];

export default function Booking() {
    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <div>
            <div className="flex items-center justify-center p-5">
                <div className="block w-5/6">
                    <HorizontalLinearStepper activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        </div>
    );
}

function StoreSelection({ selectedCity, selectedStore, setSelectedCity, setSelectedStore }) {
    const listOfCities = ["City 1", "City 2", "City 3"];
    const listOfStores = ["Store 1", "Store 2", "Store 3"];
    const handleCityChange = (event, value) => {
        setSelectedCity(value);
    };

    const handleStoreChange = (event, value) => {
        setSelectedStore(value);
    };
    return (
        <div>
            <div className="flex justify-center items-center mb-10">
                <div className="block">
                    <h1>Wähle deine Stadt</h1>
                    <Autocomplete
                        disablePortal
                        id="city-combo-box"
                        options={listOfCities}
                        value={selectedCity}
                        onChange={handleCityChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Stadt" />}
                    />
                </div>
                <div className="block ml-40">
                    <h1>Wähle deinen Store</h1>
                    <Autocomplete
                        disablePortal
                        id="store-combo-box"
                        options={listOfStores}
                        value={selectedStore}
                        onChange={handleStoreChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Store" />}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Map />
            </div>
        </div>
    )
}
function BikeSelection({ fields, setFields, selectedOptions, setSelectedOptions, inputValues, setInputValues }) {

    const GET_ALL_BIKES = gql`
    query {
        getBikes {
            id
            type
            brand
            model 
            year 
            color 
            price
            description
            rented
            bikeStore
      }
    }
  `;
    const { loading, error, data } = useQuery(GET_ALL_BIKES);
    console.log(data)


    const handleAddField = () => {
        setFields([...fields, { id: Date.now(), value: "" }]);
        setSelectedOptions({ ...selectedOptions, [fields.length]: options[0].value });
        setInputValues({ ...inputValues, [fields.length]: "" });
    };

    const handleDeleteField = (id) => {
        const newFields = fields.filter((field) => field.id !== id);
        setFields(newFields);
        const newSelectedOptions = { ...selectedOptions };
        const newInputValues = { ...inputValues };
        delete newSelectedOptions[id];
        delete newInputValues[id];
        setSelectedOptions(newSelectedOptions);
        setInputValues(newInputValues);
    };

    const handleChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, value };
            } else {
                return field;
            }
        });
        setFields(newFields);
    };

    const handleOptionChange = (id, option) => {
        setSelectedOptions({ ...selectedOptions, [id]: option });
    };

    const handleInputChange = (id, input) => {
        setInputValues({ ...inputValues, [id]: input });
    };

    return (
        <Box>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        borderRadius: "10px",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
                    }}>
                        <BikeSelectionItem
                            id={field.id}
                            selectedOption={selectedOptions[field.id] || 'option1'} // hier wird 'option1' als Default-Wert gesetzt
                            setSelectedOption={handleOptionChange}
                            inputValue={inputValues[field.id]}
                            setInputValue={handleInputChange}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteField(field.id)}
                            sx={{ marginLeft: 'auto' }}
                        >
                            Delete
                        </Button>
                    </Box>


                </Box>
            ))}
            <Button variant="contained" onClick={handleAddField}>
                +
            </Button>
        </Box>
    );
}
function BikeSelectionItem({ id, selectedOption, setSelectedOption, inputValue, setInputValue }) {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
    ];

    const handleOptionChange = (e) => {
        setSelectedOption(id, e.target.value);
    };

    const handleInputChange = (e) => {
        setInputValue(id, e.target.value);
    };

    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box sx={{ mr: 2 }}>
                    <Image src="/bike_one.png" width={300} height={50} alt="" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id={`select-option-label-${id}`}>Option</InputLabel>
                        <Select
                            labelId={`select-option-label-${id}`}
                            id={`select-option-${id}`}
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mr: 2 }}>
                    <TextField label="Number" value={inputValue} onChange={handleInputChange} />
                </Box>
                {/* <RadioGroup row value="1" onChange={handleRadioChange}>
                    {[1, 2, 3].map((value) => (
                        <FormControlLabel
                            key={value}
                            value={value.toString()}
                            control={<Radio />}
                            label={`Radio ${value}`}
                        />
                    ))}
                </RadioGroup> */}
            </Box>
        </div>
    );
}
function UserLogin() {

    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginClick = () => {
        // handle login button click event
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Box>
                        <Button variant="contained" fullWidth onClick={handleLoginClick}>
                            Login
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
function PaymentPage() {
    return (
        <div>
            <Box sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Zahlungsmethoden
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: 1,
                                borderRadius: 1,
                                p: 2,
                            }}
                        >
                            <CreditCard sx={{ fontSize: 48, mr: 2 }} />
                            <Typography variant="subtitle1">Kreditkarte</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: 1,
                                borderRadius: 1,
                                p: 2,
                            }}
                        >
                            <Payment sx={{ fontSize: 48, mr: 2 }} />
                            <Typography variant="subtitle1">PayPal</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: 1,
                                borderRadius: 1,
                                p: 2,
                            }}
                        >
                            <MonetizationOn sx={{ fontSize: 48, mr: 2 }} />
                            <Typography variant="subtitle1">Überweisung</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
const ADD_ORDER = gql`
  mutation AddOrder($input: OrderInput!) {
    addOrder(input: $input) {
          customer
          bike
          date
          price
    }
  }
`;
import { useRouter } from "next/navigation";
function HorizontalLinearStepper({ activeStep, setActiveStep }) {
    const router = useRouter();
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    const [fields, setFields] = useState([{ id: Date.now(), value: "" }]);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [inputValues, setInputValues] = useState({});

    const steps = ['Choose Store', 'Choose Bike', 'User Login', 'Payment'];

    const [skipped, setSkipped] = React.useState(new Set());

    const [addOrder, { loading, error, data }] = useMutation(ADD_ORDER);

    const testId = "6430196df543f809796bbb1a";


    const handleAddOrder = async () => {
        try {
            const result = await addOrder({
                variables: {
                    input: {
                        bike: testId,
                        customer: testId,
                        date: "now",
                        price: 500,
                    },
                },
            });
            console.log(result.data);
            let tetsf = { foo: "bar", baz: 123 };
            router.push({
                pathname: "/bookingConfirmation",
                query: { order: JSON.stringify(tetsf) },
              });
              
        } catch (error) {
            console.error(error);
            handleReset();
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const isStepOptional = (step) => {
        return step === 10;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if (activeStep === steps.length - 1) {
            console.log("PUSH")
            handleAddOrder()
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 'none' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>

                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 0, mb: 1 }}>
                        {/* <Content activeStep={activeStep} /> */}
                        <div className="p-10">
                            {activeStep == 0 ? (
                                <StoreSelection activeStep={activeStep} className="" selectedCity={selectedCity} selectedStore={selectedStore} setSelectedCity={setSelectedCity} setSelectedStore={setSelectedStore} />

                            ) : activeStep == 1 ? (
                                <BikeSelection activeStep={activeStep} fields={fields} setFields={setFields} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} inputValues={inputValues} setInputValues={setInputValues} />
                            ) : activeStep == 2 ? (
                                <UserLogin activeStep={activeStep} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                            ) : (
                                <PaymentPage />
                            )}
                        </div>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography >
                        <div className="p-10">
                            {activeStep == 0 ? (
                                <StoreSelection activeStep={activeStep} className="" selectedCity={selectedCity} selectedStore={selectedStore} setSelectedCity={setSelectedCity} setSelectedStore={setSelectedStore} />

                            ) : activeStep == 1 ? (
                                <BikeSelection activeStep={activeStep} fields={fields} setFields={setFields} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} inputValues={inputValues} setInputValues={setInputValues} />
                            ) : activeStep == 2 ? (
                                <UserLogin activeStep={activeStep} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                            ) : (
                                <PaymentPage />
                            )}
                        </div>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
function Map() {

    const GET_ALL_BIKESTORES = gql`
    query {
      getBikeStores {
        id
        name
        street
        city
        state
        zip
        phone
        email
      }
    }
  `;
    const { loading, error, data } = useQuery(GET_ALL_BIKESTORES);
    // const cities = Array.from(new Set(data.getBikeStores.map((store) => store.city)));

    console.log(data)

    const mapContainerStyle = {
        width: "65vw",
        height: "60vh",
    };

    const center = {
        lat: 49.488888,
        lng: 8.469167,
    };
    const locations = [
        {
            name: "a",
            coordinates: {
                lat: 49.488888,
                lng: 8.469167,
            },
        },
        {
            name: "b",
            coordinates: {
                lat: 49.496888,
                lng: 8.479167,
            },
        },
        {
            name: "c",
            coordinates: {
                lat: 49.483888,
                lng: 8.479167,
            },
        },
    ];
    const [marker] = useState({});

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries, // Verwenden Sie die libraries Konstante hier
    });

    // Der Rest bleibt gleich
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    const styles = require("./GoogleMapStyles.json");
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            options={{
                disableDefaultUI: true, // disable default map UI
                draggable: true, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale controle
                scrollwheel: true, // allow scroll wheel
                styles: styles, // change default map styles
            }}
        >
            {locations.map((location) => (
                <MarkerF
                    key={location.name}
                    position={location.coordinates}
                    icon={{
                        url: "/shop.svg",
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                />
            ))}
        </GoogleMap>
    );
}
