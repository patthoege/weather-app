import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
};

export const airQualityIndexText = [
    {
        rating: 20,
        text: "good",
    },
    {
        rating: 40,
        text: "fair",
    },
    {
        rating: 60,
        text: "moderate",
    },
    {
        rating: 80,
        text: "poor",
    },
    {
        rating: 100,
        text: "extremely poor",
    },
];

export const unixToTime = (unix: number, timezone: number) => {
        return moment
        .unix(unix)
        .utcOffset(timezone / 60)
        .format("HH:mm");
};