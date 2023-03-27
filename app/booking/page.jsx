"use client"
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Inter } from 'next/font/google'
import { Box } from '@mui/material';
import { pink } from '@mui/material/colors';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';

import Streat from './streat';

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
    return (
        <main >
            <div className='w-full h-screen bg-slate-100 text-black'>
                <div className='bold'>

                    <h1 className='flex justify-center items-center text-4xl font-bold pt-10'>Buche jetzt dein Fahrrad</h1>

                    {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 p-20 ">
                        <div className="bg-gray-200 h-auto flex items-center justify-center rounded-xl">
                            <p>Stadt: Mannheim</p>
                            <Button>Pick from the Map</Button>
                        </div>
                        <div className="bg-gray-400 h-96 flex items-center justify-center rounded-xl">
                            <p className="text-center">Element 2</p>
                        </div>
                        <div className="bg-gray-600 h-96 flex items-center justify-center rounded-xl">
                            <p className="text-center">Element 3</p>
                        </div>
                        <div className="bg-gray-800 h-96 flex items-center justify-center rounded-xl">
                            <p className="text-center">Element 4</p>
                        </div>
                    </div> */}

                    <Streat/>

                </div>
            </div>
        </main>
    )
}
