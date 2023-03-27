"use client"
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Inter } from '@next/font/google'
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
import Questions from './questions_list'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main >
      <div className='w-full static'
        style={{
          backgroundImage: 'url("/mainpage.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          alignItems: 'center'
        }}>
        <div className='ml-10'>
          <PictureText />
        </div>
      </div>
      <div className='bg-white text-black pt-24 pb-24'>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}>
          {/* Hier können die Komponenten platziert werden */}
          <div className='flex items-center justify-center w-1/2 pl-10'>
            <h1 className='text-4xl font-bold mb-5'>Wie es funktioniert</h1>
          </div>
          <div className='ml-10'>
            <div class="grid grid-cols-1 gap-4">
              <div className='flex items-center gap-4'>
                <SearchIcon fontSize='large' sx={{ color: pink[500] }} />
                <p className='font-bold text-2xl'>Wähle deine Stadt aus</p>
              </div>
              <div className='flex items-center gap-4'>
                <PedalBikeIcon fontSize='large' sx={{ color: pink[500] }} />
                <p className='font-bold text-2xl'>Suche das für dich passende Fahrrad</p>
              </div>
              <div className='flex items-center gap-4'>
                <StorefrontIcon fontSize='large' sx={{ color: pink[500] }} />
                <p className='font-bold text-2xl'>Hole dir dein Fahrrad im Store ab</p>
              </div>
            </div>
          </div>
        </Box>
      </div>
      <CustomerCharts />
      <Questions />
      <AppPlacement />
      <NewsBlog />
    </main>
  )
}


function NewsBlog() {

  return (
    <div className=' bg-white'>
      <div className='flex items-center mb-10 justify-center  text-black'>
        <div className='block'>
          <h1 className='text-4xl p-10 font-bold flex items-center justify-center'>News von uns für dich</h1>
          <Box
            className="bg-slate-200 p-10"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}>
            {/* Hier können die Komponenten platziert werden */}
            <div className='w-1/2 max-w-2xl'>
              <Image
                src="/stock_news_1.png"
                alt=''
                width={1000}
                height={1000}
                className=" w-full h-auto"
              />
            </div>
            <div className='ml-5'>
              <h1 className='text-xl font-bold mb-3'>
                Das ist unsere erste Nachricht
              </h1>
              <p>
                Das ist unser Text dazu
              </p>
              <Button variant="contained" className='mt-5 mb-5 text-black' color='success' >Erfahre mehr</Button>
            </div>
          </Box>
        </div>
      </div>
    </div>

  )

}


function AppPlacement() {

  return (
    <div className='bg-white'>
      <div class="max-w-7xl mx-auto">
        <div className='flex items-center justify-center  text-black'>
          <div className='bg-slate-200 p-10 mt-20 mb-20 w-3/4'>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}>
              <div className='flex items-center justify-center w-full pl-10'>
                <div className='block'>
                  <p className='text-xl font-bold'>
                    Wusstest du schon, wir haben auch eine APP
                  </p>
                  <div className="ml-10 mt-5 ">
                    <ul className='list-none' >
                      <li>
                        <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
                        <p className='ml-5 inline-block'>nr one</p>
                      </li>
                      <li>
                        <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
                        <p className='ml-5 inline-block'>nr two</p>
                      </li>
                      <li>
                        <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
                        <p className='ml-5 inline-block'>nr three</p>
                      </li>
                    </ul>
                  </div>
                  <p className='text-lg font-bold mt-5'>
                    Jetzt hier herunterladen und Vorteile genießen
                  </p>
                  <div className='w-full'>
                    <div className='flex items-start gap-4 mt-10'>
                      <Image src="/get_on_app_store.png" alt="" width={200} height={200} className="w-full h-auto" />
                      <Image src="/get_on_play_store.png" alt="" width={200} height={200} className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full h-96 flex-grow-1 flex items-center justify-center'>
                <Image
                  src="/iphone_app.png"
                  alt=""
                  width={800}
                  height={800}
                  className="w-auto h-full "
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomerCharts() {

  return (
    <div className='bg-slate-100 flex h-auto justify-center items-center w-full' >
      <div className='text-black block ' >
        <div className='flex justify-center items-center'>
          <h1 className='w-max mt-24 mb-16 text-4xl font-bold '>Unsere Kunden lieben:</h1>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} >
              <div className='mt-2'>
                <p className='text-2xl mt-5 flex justify-center items-center'>Klassisches Stadtbike</p>
                <Image
                  src="/bike_one.png"
                  alt=""
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "auto", padding: "20px" }}
                />
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
  )

}


function PictureText() {
  return (
    <div className='pt-10 pb-10'>
      <p className='text-2xl font-bold'>Jetzt Buchen</p>
      <div className="ml-10 mt-5 ">
        <ul className='list-none' >
          <li>
            <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
            <p className='ml-5 inline-block'>nr one</p>
          </li>
          <li>
            <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
            <p className='ml-5 inline-block'>nr two</p>
          </li>
          <li>
            <CheckIcon sx={{ color: pink[500] }} className='inline-block' />
            <p className='ml-5 inline-block'>nr three</p>
          </li>
        </ul>
      </div>
      <div>
        <p className='mt-5 text-2xl font-bold'>Schau mal, ob wir in deiner Stadt sind </p>
      </div>
      <div className='mt-5 flex'>
        <CityAutocomplete className="mt-10 bg-slate-100" />
        <Button variant="contained" className='bg-slate-100 hover:bg-pink-500 ml-2 rounded-lg text-black' >Zu den Bikes</Button>
      </div>
    </div>
  )
}

function CityAutocomplete() {

  const cities = [
    { label: 'Mannheim', plz: '68169' },
    { label: 'Hockenheim', plz: '68766' },
  ];

  return (
    <Autocomplete
      disablePortal
      options={cities}
      sx={{
        width: 300,
        '& .MuiOutlinedInput-root': { // Ändere die Hintergrundfarbe des Input-Feldes
          backgroundColor: 'white',
          borderRadius: 2,
        },
        '& .MuiOutlinedInput-input': { // Ändere die Textfarbe des Input-Feldes
          color: 'black',
        },
      }}
      renderInput={(params) => <TextField
        {...params}
        label="Stadt"
      />}
    />

  )
}

