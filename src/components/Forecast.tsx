import React, {FC, useEffect, useState} from "react";
import { 
    Grid, 
    List, 
    ListItem, 
    Typography 
} from "@mui/material";

import { WeatherEntry } from "./WeatherEntry";
import { getForecast, getWeather } from "../api/FetchWeatherData";
import { Weather, Location } from "../models/WeatherInterfaces";

interface ForecastProps {
    location: Location | null;
}

// Component for generating 5-day-3-hour forecast
export const Forecast: FC<ForecastProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Weather[] | null>(null);

    useEffect(() => {
        (async function() {
            if(location) {
                // fetch weather data for location
                const [weather, forecast] = await Promise.all([
                    getWeather(location.id),
                    getForecast(location.id)
                ]);
                // set the data to a state
                setWeather(weather);
                setForecast(forecast);
            }
        })()
    }, [location]);

    if(!location || !weather || !forecast) return null;

    return(
        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <Typography variant="h4">Forecast</Typography>
            </Grid>
            <Grid item>
                <List style={({whiteSpace: 'nowrap'})}>
                    {forecast.map(timePoint =>
                        <ListItem key={timePoint.dt}>
                            <WeatherEntry weather={timePoint} />
                        </ListItem>
                    )}
                </List>
            </Grid>
        </Grid>
    )
}