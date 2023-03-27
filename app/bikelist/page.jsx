"use client"
import { pink } from '@mui/material/colors';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Link from 'next/link';
import Image from 'next/image';



const steps = ['Wähle einen Standort', 'Wähle dein Fahrrad', 'Userdaten', 'Bezahlen'];


export default function Bikelist() {

    return (
        <div>
            <div className='p-10 text-black'>
                <HorizontalNonLinearStepper />
            </div>
        </div>
    )

}
const top100Films = [
    { label: 'Mannheim' },
]

function Location() {
    return (

        <div >
            <div className='flex items-center justify-center'>
                <h1> Wähle deine Stadt </h1>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Stadt" />}
                />

                <h1>
                    Wähle deinen Store
                </h1>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />

                {/* <Button variant="contained" className='mt-10' sx={{ color: pink[500] }} >Weiter</Button> */}


            </div>
        </div>

    )
}
function Bikeslection() {
    return (

        <div>
            <div className=' flex h-auto justify-center items-center w-full' >
                <div className='text-black block ' >
                    <div className='flex justify-center items-center'>
                        <h1 className='w-max mt-24 mb-16 text-4xl font-bold '>Für dich verfügbare Räder</h1>
                    </div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} >
                                <div className='block mt-2 bg-slate-100 p-5'>
                                    <p className='text-2xl mt-5 flex justify-center items-center'>Klassisches Stadtbike</p>
                                    <Image
                                        src="/bike_one.png"
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        style={{ width: "100%", height: "auto", padding: "20px" }}
                                    />
                                    <Button variant="contained" sx={{ color: pink[500] }} >Buchen</Button>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className='mt-2 '>
                                    <p className='text-2xl mt-5 flex justify-center items-center'>Elektrisches Stadtbike</p>
                                    <Image
                                        src="/bike_two.png"
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        style={{ width: "100%", height: "auto", padding: "20px" }}
                                        className="flex justify-center items-center"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className=' flex justify-center items-center p-5' >
                        <Link href="/bikes">
                            <Button variant="contained" sx={{ color: pink[500] }} >Zu den Bikes</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
function Userdata() {
    return (

        <div>
            Userdata
        </div>

    )
}
function Payment() {
    return (

        <div>
            Payment
        </div>

    )
}


function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="primary" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            <div className='p-10'>
                                {activeStep == 0 ? (
                                    <Location />
                                ) : activeStep == 1 ? (
                                    <Bikeslection />
                                ) : activeStep == 2 ? (
                                    <Userdata />
                                ) : (
                                    <Payment />
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
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        {console.log(activeStep)}
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}