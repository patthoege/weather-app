"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { atmosphere, clearSky, cloudy, drizzleIcon, navigation, rain, snow, thunderstorm } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Temperature() {
    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast;

    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        if (!timezone) return; // Handle cases where timezone is not yet available
        const updateTime = () => {
            const localMoment = moment().utcOffset(timezone / 60);
            const formatTime = localMoment.format("HH:mm:ss");
            const weekDay = localMoment.format("dddd");

            setLocalTime(formatTime);
            setCurrentDay(weekDay);
        };

        // Update time initially
        updateTime();
        // Set interval to update time every second
        const interval = setInterval(updateTime, 1000);
        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [timezone]);

    if (!forecast || !weather) {
        return <div>Loading...</div>;
    }

    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);
    const { main: weatherMain, description } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            case "Thunderstorm":
                return thunderstorm;
            case "Mist":
                return atmosphere;
            default:
                return clearSky;
        }
    };

    return (
        <div className="pt-6 pb-5 px-5 border border-gray-400 rounded-lg flex flex-col justify-between
         dark:bg-dark-grey dark:border-gray-400 shadow-md dark:shadow-none"
        >
            <p className="flex justify-between items-center">
                <span className="font-medium">{currentDay}</span>
                <span className="font-medium">{localTime}</span>
            </p>
            <p className="pt-2 font-bold flex gap-1">
                <span>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className="pt-2 capitalize text-lg font-medium">{description}</p>
                </div>
                <p className="flex items-center gap-2">
                    <span>Low:<strong> {minTemp}° </strong></span> | <span>High:<strong> {maxTemp}° </strong></span> | <span>Humidity: <strong>{main?.humidity}% </strong></span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;
