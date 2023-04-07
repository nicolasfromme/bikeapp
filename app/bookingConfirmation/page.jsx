import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";

export default function BookingConfirmation({ pickupLocation, bookedBikes }) {
  const [message] = useState("Danke für deine Bestellung!");
  const router = useRouter();

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