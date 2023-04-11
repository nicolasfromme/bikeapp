"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";

export default function BookingConfirmation() {
  const router = useRouter();
  const { order } = router.query;
  

  console.log(order)

  bookedBikes = [
    {
      id:"0",
      name: "schnelles Fahrrad",
    }
  ]
  pickupLocation = "Hier"
  const [message] = useState("Danke für deine Bestellung!");

  const handleBackButtonClick = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>{message}</h1>
      <p>Abholungsort: {pickupLocation}</p>
      <ul>
        {bookedBikes.map((bike) => (
          <li key={bike.id}>{bike.name}</li>
        ))}
      </ul>
      <Button variant="contained" onClick={handleBackButtonClick}>
        Zurück zur Hauptseite
      </Button>
    </div>
  );
}