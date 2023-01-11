import React, {FC, useEffect, useState} from "react";
import { 
    Divider,
    Grid, 
    Typography 
} from "@mui/material";

import { WeatherEntry } from "./WeatherEntry";
import { Weather, Location } from "../models/WeatherInterfaces";
import { getForecast, getWeather } from "../api/FetchWeatherData";

interface CurrentWeatherProps {
    location: Location | null;
}

// Component for showing the current weather
export const CurrentWeather: FC<CurrentWeatherProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Weather[] | null>(null);

    useEffect(() => {
        (async function() {
            if(location) {
                const [weather, forecast] = await Promise.all([
                    getWeather(location.id),
                    getForecast(location.id)
                ]);
                setWeather(weather);
                setForecast(forecast);
            }
        })()
    }, [location]);

    if(!location || !weather || !forecast) return null;

    return(
        <Grid container spacing={6} direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <Typography variant="h4">Weather right now</Typography>
            </Grid>
            <Grid item>
                <WeatherEntry weather={weather} />
            </Grid>
        </Grid>
    )
}