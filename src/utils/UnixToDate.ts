// API returns time as Unix, this function converts it to a proper time format
export function convertUnixToDate(unixUtc: number): Date {
    return new Date(unixUtc * 1000);
}