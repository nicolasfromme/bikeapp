import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useForm } from 'react-hook-form'

export default function bookingdata() {

    const {
        register,
        handleSubmit
      } = useForm();

      const [fNameError, setfNameError] = React.useState("");
      const [lNameError, setlNameError] = React.useState("");
      const [emailError, setEmailError] = React.useState("");
      const [straßeError, setStraßeError] = React.useState("");
      const [plzError, setPlzError] = React.useState();
      const [ortError, setOrtError] = React.useState("");
     
     /*  const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      } */

      const handleFormSubmit = (formData) => {
        console.log(formData);
        if(!formData.firstname || !formData.firstname.length){
            setfNameError("First Name is required");
            return false;
        }   else {
            setfNameError("");
        }
        if(!formData.lastname || !formData.lastname.length){
            setlNameError("Last Name is required");
            return false;
        }   else {
            setlNameError("");
        }
        if(!formData.straße || !formData.straße.length){
            setStraßeError("Straße is required");
            return false;
        }   else {
            setStraßeError("");
        }
        if(!formData.plz || !formData.plz.length || typeof formData === 'number'){
            setPlzError("PLZ is required");
            return false;
        }   else {
            setPlzError("");
        }
        if(!formData.wohnort || !formData.wohnort.length){
            setOrtError("Wohnort is required");
            return false;
        }   else {
            setOrtError("");
        }
        if(!formData.email || !formData.email.length){
            setEmailError("Email is required");
            return false;
        }   else {
            setEmailError("");
        }
        console.log("submitting data: ")
        return true;
        
      };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h4">
                    Kundendaten
                    </Typography>
                <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 3 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        error={fNameError && fNameError.length ? true : false}
                        autocomplete="given-name"
                        required
                        fullWidth
                        id="firstName"
                        label="Vorname"
                        autoFocus 
                       /*  onChange={handleChange} */
                        helperText={fNameError}
                        {...register('firstname')}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        error={lNameError && lNameError.length ? true : false}
                        autocomplete="given-name"
                        required
                        fullWidth
                        id="lastName"
                        label="Nachname"
                        autoFocus
                        /* onChange={handleChange} */
                        helperText={lNameError}
                        {...register('lastname')}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        error={straßeError && straßeError.length ? true : false}
                        autocomplete="given-name"
                        required
                        fullWidth
                        id="straße"
                        label="Straße und Hausnummer"
                        autoFocus
                        {...register('straße')}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                        error={plzError && plzError.length ? true : false}
                        autocomplete="given-name"
                        required
                        type="number"
                        fullWidth
                        id="plz"
                        label="PLZ"
                        autoFocus
                        {...register('plz')}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField 
                        error={ortError && ortError.length ? true : false}
                        autocomplete="given-name"
                        required
                        fullWidth
                        id="ort"
                        label="Wohnort"
                        autoFocus
                        {...register('wohnort')}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        error={emailError && emailError.length ? true : false}
                        autocomplete="given-email"
                        required
                        fullWidth
                        id="email"
                        label="E-Mail"
                        autoFocus
                        {...register('email')}>
                        </TextField>
                    </Grid>
                    </Grid>
                    <Button
                    type="buchen"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    >Jetzt Buchen
                    </Button>
                </Box>
            </Box>
        </Container>
    );
    }