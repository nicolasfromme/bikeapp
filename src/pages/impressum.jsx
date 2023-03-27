import React from "react";
import Container from '@mui/material/Container';


function Impressum() {
  return (
    <Container fluid>
      <div id="WholeText">
        <div id="HeaderText">
          <h1>
            <center>Impressum</center>
          </h1>
        </div>
        <hr class="rounded" />
        <div>
          <h3>Anbieter dieses Angebots</h3>
        </div>
        <br></br>
        <div id="Text">
          <p>Fahrradvermietung Oberschicht </p>
          <p>Preiserstr. 1 </p>
          <p>68165 Mannheim</p>
        </div>
        <div>
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

export default Impressum;