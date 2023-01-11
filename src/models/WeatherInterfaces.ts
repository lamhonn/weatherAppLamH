export interface Coordinates {
    lon: number;
    lat: number;
}

export interface Location {
    coord: Coordinates;
    id: number;
    name: string;
}

export interface Condition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Weather {
    weather: Condition[];
    main: MainWeatherData;
    dt: number;
}