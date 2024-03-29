"use client"
import React from "react";
import Container from '@mui/material/Container';

export default function Impressum() {
  return (
    <Container fluid className="text-black">
      <div id="WholeText">
        <div id="HeaderText">
          <h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <center>Impressum</center>
          </h1>
        </div>
        <hr className="rounded" />
        <div>
          <h3>Anbieter dieses Angebots</h3>
        </div>
        <br></br>
        <div id="Text">
          <p>Bike Booking</p>
          <p>Maxmustermannstr. 1 </p>
          <p>68199 Mannheim</p>
        </div>
        <div>
        <br/>
        <br/>
          <h3>Kontaktaufnahme</h3>
        </div>
        <br></br>
        <div id="Text">
          <p>Email: info@meinefahrradvermietung.de</p>
          <p>
          telefonisch unter: +49 1234 5678910
          </p>

        </div>
      </div>
    </Container>
  );
}