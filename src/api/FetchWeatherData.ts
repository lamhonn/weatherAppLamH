import { resourceLimits } from "worker_threads";

import { Weather, Location } from "../models/WeatherInterfaces";

// import API key from .env
// make sure to have an .env file in root folder and include REACT_APP_API_KEY in it
const key: string = process.env.REACT_APP_API_KEY as string;
if (key === undefined) throw new Error('No API key defined!');

const baseURL = "http://api.openweathermap.org/data/2.5"; 

export async function search(searchTerm: string): Promise<Location | undefined> {
    // Fetches weather data from a searched location 
    const data = await fetch(`${baseURL}/weather?q=${searchTerm}&appid=${key}`);

    if(data.status === 404) return undefined;
    if(data.status !== 200) throw new Error('Failed to get data');

    return await data.json();
}

export async function getWeather(locationId: number): Promise<Weather> {
    // fetch current weather data from OpenWeather API
    // try Vaasa with location ID = 632978
    const data = await fetch(`${baseURL}/weather?id=${locationId}&units=metric&appid=${key}`);

    if(data.status !== 200) throw new Error("Failed to get data");

    return await data.json();
}

export async function getForecast(locationId: number): Promise<Weather[]> {
    // fetch 5-day-3-hour forecast data from OpenWeather API
    const data = await fetch(`${baseURL}/forecast?id=${locationId}&units=metric&appid=${key}`)
    
    if(data.status !== 200) throw new Error("Failed to get data");

    return (await data.json()).list;
}

export function getIcon(iconCode: string): string {
    // get an icon from OpenWeather API corresponding to the correct weather
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
}