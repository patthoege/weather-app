import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
};

export const airQualityIndexText = [
    {
        rating: 10,
        description: "excellent",
    },
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

export const formatNumber = (num: number) => {
    if(num >= 1000000){
        return (num / 1000000).toFixed(1) + "M";
    } else if(num >= 1000){
        return (num / 1000).toFixed(1) + "K";
    } else {
        return num;
    }
};