"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";

export default function BookingConfirmation() {
  const router = useRouter();

  const bookedBikes = [
    {
      id:"0",
      name: "schnelles Fahrrad",
    }
  ]
  const pickupLocation = "Hier"
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
        <p className="text-black">Zurück zur Hauptseite</p> 
      </Button>
    </div>
  );
}