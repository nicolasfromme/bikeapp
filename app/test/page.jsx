"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";

export default function InputForm() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleConfirm = () => {
    // Hier kannst du die Eingabe speichern oder validieren, bevor du zur nächsten Seite navigierst
    router.push(`/`);
    console.log(inputValue)
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TextField
        label="Input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleConfirm}>
        Confirm
      </Button>
    </Box>
  );
}

export function DynamicInputForm() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <InputForm /> : null;
}
