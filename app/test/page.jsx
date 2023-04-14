"use client"
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';

import { TextField } from '@mui/material';

import { useState, useEffect } from "react";
import { Autocomplete } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_BIKESTORES = gql`
  query {
    getBikeStores {
      id
      name
    }
  }
`;

function StoreAutocomplete() {
  const [storeOptions, setStoreOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_BIKESTORES);

  useEffect(() => {
    if (data) {
      setStoreOptions(data.getBikeStores.map((store) => ({ label: store.name, value: store.id })));
    }
  }, [data]);

  const handleStoreChange = (event, value) => {
    if (value) {
      setSelectedStore(value.label);
      setSelectedStoreId(value.value);
      console.log(selectedStoreId)
    } else {
      setSelectedStore(null);
      setSelectedStoreId(null);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="store-autocomplete"
      options={storeOptions}
      value={selectedStore}
      onChange={handleStoreChange}
      //getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Select a store" />}
    />
  );
}

export default StoreAutocomplete;

















const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const stripe = useStripe();

  const handleCheckoutClick = async () => {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        { price: 'price_1MwLYQB9hKGLIVbSISGoH8OB', quantity: 4 }
      ],
      mode: 'payment',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
    if (error) {
      console.error(error);
    }
  };

  return (
      <Button variant="contained" onClick={handleCheckoutClick}>
        Checkout
      </Button>
  );
};

function test(){
  return(
    <div>
    <Elements stripe={stripePromise}>
      <Payment/>
    </Elements>
    </div>
  )
};
