import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
const items = [
    { title: 'Frage 1', content: 'Antowrt 1' },
    { title: 'Frage 2', content: 'Antowrt 2' },
    { title: 'Frage 3', content: 'Antowrt 3' },
];

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} className='border-t-2' />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


export default function CustomizedAccordions() {

    return (

        <div>
            <div className='bg-white text-black pt-24 pb-24'>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    {/* Hier können die Komponenten platziert werden */}
                    <div className='flex items-center justify-center w-1/2 pl-10'>
                        <h1 className='text-4xl font-bold mb-5'>Oft gestellte Fragen</h1>
                    </div>

                    <div className='block w-5/6 ml-10 mr-10'>

                        {items.map((item, index) => (
                            <Accordion key={index} >
                                <AccordionSummary
                                    expandIcon={<AddIcon color="primary" className='text-5xl' />}
                                    aria-controls={`panel-${index}`}
                                    id={`panel-header-${index}`}
                                    style={{
                                        flexDirection: 'row-reverse',
                                        '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': {
                                            transform: 'rotate(90deg)',
                                        },
                                    }}>
                                    <Typography className='font-bold ml-5 text-lg'>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className='ml-12' >{item.content}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                    </div>

                </Box>

            </div>

        </div >
    );
}