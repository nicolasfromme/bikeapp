"use client"
import React, { useState, useCallback, useEffect } from "react";
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

import { makeStyles } from '@material-ui/core/styles';

import {  List, ListItem, ListItemText } from '@material-ui/core';
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { useQuery } from '@apollo/client';


import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
    imageURL
    pricetag
  }
}`;
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
    lat
    lng
  }
}`;
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
const libraries = ["places"];

export default function Booking() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [listOfCities, setListOfCities] = useState({});
    const [listOfStores, setListOfStores] = useState({});
    const [selectableBikes, setselectableBikes] = useState([]);

    const [newMarkers, setnewMarkers] = useState({});
    //database accces
    const { loading: loadingBikes, error: errorBikes, data: bikesData } = useQuery(GET_ALL_BIKES);
    const { loading: loadingBikeStores, error: errorBikeStores, data: bikeStoresData } = useQuery(GET_ALL_BIKESTORES);

    useEffect(() => {
        if (bikesData) {
            setselectableBikes(bikesData?.getBikes.map((bike) => ({
                value: bike.id,
                label: bike.model,
                image: bike.imageURL,
                pricetag: bike.pricetag
            })) || []);
        }
    }, [bikesData]);

    useEffect(() => {
        if (bikeStoresData) {
            const stores = bikeStoresData.getBikeStores;
            const cities = [...new Set(stores.map((store) => store.city))];
            setListOfStores(stores.map((store) => ({ label: store.name, value: store.id })));
            setListOfCities(cities);
            setnewMarkers(stores.map((store) => ({
                id: store.id,
                name: store.name,
                city: store.city,
                coordinates: {
                    lat: parseFloat(store.lat),
                    lng: parseFloat(store.lng),
                },
            })))
        }
    }, [bikeStoresData]);

    if (loadingBikeStores || loadingBikes) return <p>Loading...</p>;
    if (errorBikes) return <p>Error errorBikes :(</p>;
    if (errorBikeStores) return <p>Error errorBikeStores :(</p>;

    return (
        <div>
                      <Elements stripe={stripePromise}>

            <div className="flex items-center justify-center p-5">
                <div className="block w-5/6">
                    <HorizontalLinearStepper
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        markers={newMarkers}
                        listOfCities={listOfCities}
                        listOfStores={listOfStores}
                        selectableBikes={selectableBikes} />
                </div>
            </div>
            </Elements>
        </div>
    );
}
function StoreSelection({ selectedCity, selectedStore, setSelectedCity, setSelectedStore, selectedStoreId, setSelectedStoreId, markers, listOfCities, listOfStores }) {

    const handleCityChange = (event, value) => {
        setSelectedCity(value);
    };

    const handleStoreChange = (event, value) => {
        setSelectedStore(value.label);
        setSelectedStoreId(value.value);
    };

    //map zeug

    const handleMarkerClick = (marker) => {
        if (marker.city !== selectedCity) {
            setSelectedCity(marker.city);
        }
        if (marker.name !== selectedStore) {
            setSelectedStore(marker.name);
            setSelectedStoreId(marker.id);
            console.log(marker.id)
        }
    };

    const center = {
        lat: 49.488888,
        lng: 8.469167,
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    const styles = require('./GoogleMapStyles.json');


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

                <GoogleMap
                    mapContainerStyle={{
                        width: '65vw',
                        height: '60vh',
                    }}
                    zoom={15}
                    center={center}
                    options={{
                        disableDefaultUI: true,
                        draggable: true,
                        keyboardShortcuts: false,
                        scaleControl: true,
                        scrollwheel: true,
                        styles: styles,
                    }}
                >
                    {markers.map((marker) => (
                        <MarkerF
                            key={marker.name}
                            position={marker.coordinates}
                            onClick={() => handleMarkerClick(marker)}
                            icon={{
                                url: '/shop.svg',
                                scaledSize: new window.google.maps.Size(40, 40),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    )
}
function BikeSelection({ fields, setFields, selectedOptions, setSelectedOptions, inputValues, setInputValues, fromDate, setFromDate, toDate, setToDate, selectableBikes }) {


    const options = selectableBikes;

    const handleAddField = () => {
        const newId = fields.length > 0 ? fields[fields.length - 1].id + 1 : 1;
        setFields([...fields, { id: newId, value: "" }]);
        setSelectedOptions({ ...selectedOptions, [newId]: options[0].value });
        setInputValues({ ...inputValues, [newId]: "" });
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
    const handleStartDateChange = (value) => {
        setFromDate(value)
    }
    const handleToDateChange = (value) => {
        setToDate(value)
    }


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
                            selectedOption={selectedOptions[field.id] || (options.length > 0 ? options[0].value : null)}
                            setSelectedOption={handleOptionChange}
                            inputValue={inputValues[field.id]}
                            setInputValue={handleInputChange}
                            options={options}
                            fromDate={fromDate}
                            setFromDate={handleStartDateChange}
                            toDate={toDate}
                            setToDate={handleToDateChange}
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
            <Button
                variant="contained"
                onClick={handleAddField}
            >
                <p className="text-black">+</p>
            </Button>

        </Box>
    );
}
function BikeSelectionItem({ id, selectedOption, setSelectedOption, inputValue, setInputValue, options, fromDate, setFromDate, toDate, setToDate }) {

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
                    <Image src={options.find((option) => option.value === selectedOption)?.image} width={300} height={50} alt="" />
                </Box>
                <Box sx={{ width: 200 }}>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Datum"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ mr: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Datum"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                        />
                    </LocalizationProvider>
                </Box>
                {/* <Box sx={{ mr: 2 }}>
                    <TextField label="Number" value={inputValue} onChange={handleInputChange} />
                </Box> */}
            </Box>
        </div>
    );
}
function UserLogin({ customerId, setcustomerId }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormDataChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleLoginClick = () => {
        setcustomerId("642d151b212acfeef285ade1");
        // // Validierung der Daten
        // if (formData.email === '' || !formData.email.includes('@')) {
        //     setErrorMessage('Ungültige E-Mail-Adresse');
        //     return;
        // }
        // if (formData.phone === '' || !formData.phone.match(/^\d{10}$/)) {
        //     setErrorMessage('Ungültige Telefonnummer');
        //     return;
        // }
        // if (formData.zip === '' || !formData.zip.match(/^\d{5}$/)) {
        //     setErrorMessage('Ungültige Postleitzahl');
        //     return;
        // }
        // // Wenn die Validierung erfolgreich war, setze die Fehlermeldung zurück und fahre fort
        // setErrorMessage('');
        // // ...
    };

    const handleConfirmClick = () => {
        let errors = [];

        // Check if all form fields are filled
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                errors.push(`${key} is required`);
            }
        });

        if (errors.length > 0) {
            setErrorMessage(errors.join('\n;'));
        } else {
            setErrorMessage(null);
            // Proceed with form submission
            checkCustomerExists(formData);
        }
    };

    const getCustomersQuery = gql`
      query {
        getCustomers {
          id
          firstname
          lastname
          email
          phone
          street
          city
          state
          zip
          rentals{
            id
          }
        }
      }`;

    const addCustomerMutation = gql`
      mutation($firstname: String!, $lastname: String!, $email: String!, $phone: String!, $street: String!, $city: String!, $state: String!, $zip: String!) {
        addCustomer(input: {
          firstname: $firstname,
          lastname: $lastname,
          email: $email,
          phone: $phone,
          street: $street,
          city: $city,
          state: $state,
          zip: $zip
        }) {
          id
          firstname
          lastname
          email
          phone
          street
          city
          state
          zip
        }
      }
    `;
    const { loading, error, data } = useQuery(getCustomersQuery);
    const [addCustomer] = useMutation(addCustomerMutation);

    const checkCustomerExists = (formData) => {
        console.log(data.getCustomers)
        const customer = data.getCustomers.find(
            (customer) =>
                customer.firstname == formData.firstname &&
                customer.lastname == formData.lastname &&
                customer.email == formData.email &&
                customer.phone == formData.phone &&
                customer.street == formData.street &&
                customer.city == formData.city &&
                customer.state == formData.state &&
                customer.zip == formData.zip
        );

        if (customer) {
            console.log('Customer exists with id:', customer.id);
            setcustomerId(customer.id);
            // hier die weitere Verarbeitung mit der vorhandenen customerId
        } else {
            addCustomer({
                variables: {
                    firstname: formData.firstname,
                    lastname: formData.firstname,
                    email: formData.firstname,
                    phone: formData.firstname,
                    street: formData.firstname,
                    city: formData.firstname,
                    state: formData.firstname,
                    zip: formData.firstname
                },
                refetchQueries: [{ query: getCustomersQuery }],
            })
                .then(({ data }) => {
                    console.log('Customer added with id:', data.addCustomer.id);
                    setcustomerId(data.addCustomer.id);
                    // hier die weitere Verarbeitung mit der neuen customerId
                })
                .catch((error) => console.log(error));
        }
    };


    return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {errorMessage && (
                        <Grid container justifyContent="left" sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={8} md={6}>
                                <Alert severity="error" sx={{ justifyContent: 'flex-start' }}>
                                    {errorMessage}
                                </Alert>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {customerId && (
                        <Grid container justifyContent="left" sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={8} md={6}>
                                <Alert severity="success" sx={{ justifyContent: 'flex-start' }}>This is a success alert — check it out!</Alert>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Melde dich an ...
                        </Typography>
                    </Box>
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
                            <p className="text-black">
                                Login
                            </p>
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            ... oder gib deine Daten direkt hier an
                        </Typography>
                    </Box>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="First Name"
                                fullWidth
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Email"
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Phone"
                                fullWidth
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Street"
                                fullWidth
                                name="street"
                                value={formData.street}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="City"
                                fullWidth
                                name="city"
                                value={formData.city}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="State"
                                fullWidth
                                name="state"
                                value={formData.state}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="ZIP"
                                fullWidth
                                name="zip"
                                value={formData.zip}
                                onChange={handleFormDataChange}
                            />
                        </Box>
                        <Button variant="contained" fullWidth onClick={handleConfirmClick}>
                            <p className="text-black">
                                Bestätigen
                            </p>
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
function PaymentPage({ fields, selectedOptions, selectableBikes, customerId, fromDate, toDate, handleAddOrder}) {
    const bikeOrders = fields.map((field) => {
      const bike = selectableBikes.find((bike) => bike.value === selectedOptions[field.id]);
      const startDate = field.fromDate;
      const endDate = field.toDate;
      return { bike, startDate, endDate };
    });
  
    const total = bikeOrders.length * 50;
    const bookedBikesToPushIntern = [];
    for (const key in selectedOptions) {
            bookedBikesToPushIntern.push({
                bike: selectedOptions[key],
                customer: customerId,
                date_from: fromDate.toISOString(),
                date_to: toDate.toISOString(),
                price: 20
            })
    }
    const stripe = useStripe();
  
    const handleCheckoutClick = async () => {

        await handleAddOrder()
      const { error } = await stripe.redirectToCheckout({
        lineItems: 
        [
          { price: 'price_1MwLYQB9hKGLIVbSISGoH8OB', quantity: bookedBikesToPushIntern.length }
        ],
        mode: 'payment',
        successUrl: 'http://localhost:3000/bookingConfirmation',
        cancelUrl: 'https://example.com/cancel',
      });
      if (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <List sx={{ mb: 2 }}>
            {bikeOrders.map((order, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${order.bike.label} - ${order.startDate} to ${order.endDate}`}
                  secondary={<img src={order.bike.image} alt={order.bike.label} width="100" height="50" />}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: ${total}</Typography>
          <Elements stripe={stripePromise}>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheckoutClick}>
            <p className="text-black">Confirm and Pay</p>
          </Button>
          </Elements>
        </Box>
      </div>
    );
  }  

function HorizontalLinearStepper({ activeStep, setActiveStep, markers, listOfCities, listOfStores, selectableBikes }) {
    const router = useRouter();
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    const [fields, setFields] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStore, setSelectedStore] = useState("");

    const [selectedOptions, setSelectedOptions] = useState({});
    const [inputValues, setInputValues] = useState({});

    const [customerId, setcustomerId] = useState(null);

    const [selectedStoreId, setSelectedStoreId] = useState({});


    const [fromDate, setFromDate] = React.useState(dayjs('2023-03-06'));
    const [toDate, setToDate] = React.useState(dayjs('2022-03-07'));

    const steps = ['Choose Store', 'Choose Bike', 'User Login', 'Payment'];

    const [skipped, setSkipped] = React.useState(new Set());

    const [addOrder, { loading, error, data }] = useMutation(ADD_ORDER);

    const [bookedBikesToPush, setbookedBikesToPush] = useState("");

    const handleAddOrder = async () => {
        const output = {
            selectedStoreId: selectedStoreId,
            fields: fields,
            selectedOptions: selectedOptions,
            fromDate: fromDate,
            toDate: toDate

        }
        console.log(output)

        const bookedBikesToPushIntern = [];
        for (const key in selectedOptions) {
                bookedBikesToPushIntern.push({
                    bike: selectedOptions[key],
                    customer: customerId,
                    date_from: fromDate.toISOString(),
                    date_to: toDate.toISOString(),
                    price: 20
                })
        }
        setbookedBikesToPush(bookedBikesToPushIntern);
        console.log(bookedBikesToPushIntern)
        try {
            const promises = bookedBikesToPushIntern.map((bookedBike) => {
                return addOrder({
                    variables: {
                        input: {
                            bike: bookedBike.bike,
                            customer: bookedBike.customer,
                            date: bookedBike.date_from,
                            price: bookedBike.price.toString,
                        },
                    },
                });
            });
            const results = await Promise.all(promises);
            console.log(results);
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
                                <StoreSelection
                                    activeStep={activeStep}
                                    className=""
                                    selectedCity={selectedCity}
                                    selectedStore={selectedStore}
                                    setSelectedCity={setSelectedCity}
                                    setSelectedStore={setSelectedStore}
                                    selectedStoreId={selectedStoreId}
                                    setSelectedStoreId={setSelectedStoreId}
                                    markers={markers}
                                    listOfCities={listOfCities}
                                    listOfStores={listOfStores}
                                />

                            ) : activeStep == 1 ? (
                                <BikeSelection
                                    activeStep={activeStep}
                                    fields={fields}
                                    setFields={setFields}
                                    selectedOptions={selectedOptions}
                                    setSelectedOptions={setSelectedOptions}
                                    inputValues={inputValues}
                                    setInputValues={setInputValues}
                                    fromDate={fromDate}
                                    setFromDate={handleStartDateChange}
                                    toDate={toDate}
                                    setToDate={handleToDateChange}
                                    selectableBikes={selectableBikes} />
                            ) : activeStep == 2 ? (
                                <UserLogin
                                    activeStep={activeStep}
                                    username={username}
                                    setUsername={setUsername}
                                    password={password}
                                    setPassword={setPassword}
                                    customerId={customerId}
                                    setcustomerId={setcustomerId} />
                            ) : (

                                <PaymentPage 
                                    fields={fields}
                                    selectedOptions={selectedOptions}
                                    selectableBikes={selectableBikes}
                                    bookedBikesToPush={bookedBikesToPush}
                                    customerId={customerId}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    handleAddOrder={handleAddOrder}
                                />
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
                                <StoreSelection
                                    activeStep={activeStep}
                                    className=""
                                    selectedCity={selectedCity}
                                    selectedStore={selectedStore}
                                    setSelectedCity={setSelectedCity}
                                    setSelectedStore={setSelectedStore}
                                    selectedStoreId={selectedStoreId}
                                    setSelectedStoreId={setSelectedStoreId}
                                    markers={markers}
                                    listOfCities={listOfCities}
                                    listOfStores={listOfStores} />

                            ) : activeStep == 1 ? (
                                <BikeSelection
                                    activeStep={activeStep}
                                    fields={fields}
                                    setFields={setFields}
                                    selectedOptions={selectedOptions}
                                    setSelectedOptions={setSelectedOptions}
                                    inputValues={inputValues}
                                    setInputValues={setInputValues}
                                    fromDate={fromDate}
                                    setFromDate={setFromDate}
                                    toDate={toDate}
                                    setToDate={setToDate}
                                    selectableBikes={selectableBikes} />
                            ) : activeStep == 2 ? (
                                <UserLogin
                                    activeStep={activeStep}
                                    username={username}
                                    setUsername={setUsername}
                                    password={password}
                                    setPassword={setPassword}
                                    customerId={customerId}
                                    setcustomerId={setcustomerId} />
                            ) : (
                                <PaymentPage 
                                    fields={fields}
                                    selectedOptions={selectedOptions}
                                    selectableBikes={selectableBikes}
                                    bookedBikesToPush={bookedBikesToPush}
                                    customerId={customerId}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    handleAddOrder={handleAddOrder}
                                />
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