"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import React from "react";


function Temperature() {
    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast;

    console.log(main)

    if(!forecast || !weather) {
        return <div>Loading...</div>;
    }

    return (
    <div className="pt-6 pb-5 border border-gray-400 rounded-lg flex flex-col justify-between
     dark:bg-dark-grey dark:border-gray-400 shadow-md dark:shadow-none"
    >
        Temperature
    </div>
    );
}

export default Temperature;
