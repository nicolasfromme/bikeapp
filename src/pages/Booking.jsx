import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/* const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  }; */

const data = {
  age: ["2", "3", "20"]
}


export default function booking() {

  const [value, setValue] = React.useState(dayjs('2023-03-06'));
  const [value2, setValue2] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <Box sx={{  bgcolor: '#cfe8fc', height: '100vh' }}>
      <h1>Buchungsübersicht</h1> <br />
      <Grid container spacing={2} alignItems='center' justifyContent='center' dircetion='column'>
        <Grid item xs={5}>
            <Card sx={{
              alignItems: 'center',
              maxWidth: '95%' ,
              marginLeft: '20px' ,
            }}
            >
              <CardMedia
                component="img"
                alt="bike"
                height="350"
                image="bike.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Philosophie Studenten Porsche
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Low Budget
                </Typography>
              </CardContent>
            </Card>
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={2} columns={10}>
            <Item>
              <h1>Abholung</h1> <br />
              <p>Abholtag:</p>
              <Grid>
                <Item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Datum"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </Item>
              </Grid>
              <p>Abholzeit:</p>
              <Grid>
                <Item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Uhrzeit"
                      value={value2}
                      onChange={(newValue2) => setValue(newValue2)}
                    />
                  </LocalizationProvider>
                </Item>
              </Grid>
              <p>Anzahl Zweiräder:</p>
              <Grid>
                <Item>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={data.age}
                      autoWidth
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Grid>
              <br /> <br />
              <h1>Zeitraum wählen</h1> <br />
              <p>Abholzeit:</p>
              <Grid>
                <Item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="1stunde" control={<Radio />} label="1.Stunde" />
                      <FormControlLabel value="4stunden" control={<Radio />} label="4.Stunden" />
                      <FormControlLabel value="1tag" control={<Radio />} label="1.Tag" />
                    </RadioGroup>
                  </FormControl>
                </Item>
              </Grid>
              <br />
              <p>Zeitraum selbst wählen:</p>
              <Grid>
                <Item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Start Datum" defaultValue={dayjs('2023-03-06')} />
                    <DatePicker
                      label="End Datum"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </Item>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}