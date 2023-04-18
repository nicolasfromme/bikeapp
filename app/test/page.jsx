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

import { useMutation } from '@apollo/client';


const ADD_ORDER = gql`
  mutation AddOrder($input: OrderInput!) {
    addOrder(input: $input) {
      id
      customer
      bike
      date
      price
    }
  }
`;

export default function MyComponent() {
  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER);

  const orderInput = [
    {
      bike: '64349409f502a87b8a8771d7',
      customer: '642d151b212acfeef285ade1',
      date: '2023-03-05T23:00:00.000Z',
      price: '20',
    },
    {
      bike: '64349409f502a87b8a8771d7',
      customer: '642d151b212acfeef285ade1',
      date: '2023-03-05T23:00:00.000Z',
      price: '20',
    },
  ];

  const handleAddOrders = async () => {
    const promises = orderInput.map((input) => addOrder({ variables: { input } }));
    await Promise.all(promises);
  };

  return (
    <div className='pt-20'>
      <button onClick={handleAddOrders}>Bestellungen aufgeben</button>
      {loading && <p>Lade...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {data && <p>Bestellungen erfolgreich aufgegeben!</p>}
    </div>
  );
}
