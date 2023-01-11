import React, { FC, useState } from 'react';
import { 
  Alert, 
  Box, 
  Grid, 
  Snackbar, 
  Typography
} from '@mui/material';

import './App.css';
import { search } from './api/FetchWeatherData';
import Navbar from './components/Navbar';
import { SearchLocation } from './components/SearchLocation';
import { Forecast } from './components/Forecast';
import { CurrentWeather } from './components/CurrentWeather';
import { Location } from './models/WeatherInterfaces';

function App() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    resetAlerts();
  };

  const resetAlerts = () => {
    setError("");
    setOpen(false);
  }

  let findLocation = async (searchTerm: string) => {
    resetAlerts();
    const location = await search(searchTerm);

    if(!location) {
      setError(`Couldn't find anything with '${searchTerm}'`);
      setOpen(true);
    } 
    else {
      setCurrentLocation(location);
    }
  }

  return (
    <Box className="App" sx={{backgroundColor:"#D3D3D3"}}>
      <Snackbar 
        open={open} 
        autoHideDuration={5000} 
        onClose={handleClose}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert
          variant="filled" 
          severity="error"
        >
            {error}
        </Alert>
      </Snackbar>
      
      <Navbar />
      <Grid 
        container 
        justifyContent={"center"} 
        direction={"column"} 
        spacing={5}
        sx={{marginTop:"0.5%"}}  
      >
        <Grid item>
          <SearchLocation onSearch={findLocation}/>
        </Grid>
        <Grid item>
          <Typography variant="h3">{currentLocation?.name}</Typography>
        </Grid>
        <Grid item>
          <CurrentWeather location={currentLocation} />
        </Grid>
        <Grid item>
           <Forecast location={currentLocation} />      
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
