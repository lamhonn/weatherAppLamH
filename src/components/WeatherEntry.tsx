import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import { 
    Box, 
    Typography 
} from "@mui/material";

import { Weather } from "../models/WeatherInterfaces";
import { getIcon } from "../api/FetchWeatherData";
import { convertUnixToDate } from "../utils/UnixToDate";

interface WeatherEntryProps {
    weather: Weather;
}

// Handles weather information output
export const WeatherEntry: FC<WeatherEntryProps> = ({weather}) => {
    // Show proper date and time, not the most elegant way of handling it
    const conversion = convertUnixToDate(weather.dt);
    const date = conversion.getDate() + "." + (conversion.getMonth() + 1);
    const hours = conversion.getHours();
    const minutes = "0" + conversion.getMinutes();
    const time = hours + ':' + minutes.substr(-2);

    return(
    <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"center"} spacing={2}>
        <Grid item>
            <Typography variant="h6">{date} <b>{time}</b></Typography>
        </Grid>
        <Grid item>
            {weather.weather.map(condition => 
                <Box key={condition.id}>
                    <img src={getIcon(condition.icon)} alt={condition.main} title={condition.description}/>
                </Box>
            )}
        </Grid>
        <Grid item>
            <Typography variant="h6" fontWeight={"bold"}>{weather.main.temp}°C</Typography>
        </Grid>
    </Grid>
    );
}