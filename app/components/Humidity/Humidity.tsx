"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { droplets } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Humidity() {
    const { forecast } = useGlobalContext();

    // check if daily forecast data is available,
    if (
        !forecast || 
        !forecast?.main ||
        !forecast?.main?.humidity
    ) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { humidity } = forecast?.main;
  
    const getHumidityText = (humidity: number) => {
        if (humidity < 30) {
          return "Humidity is dry.";
        }
        if (humidity >= 30 && humidity < 50) {
          return "Humidity is comfortable.";
        }
        if (humidity >= 50 && humidity < 70) {
          return "Humidity is humid.";
        }
        if (humidity >= 70) {
          return "Humidity is very humid.";
        }
        return "Unavailable humidity data.";
    };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border border-gray-400 
    rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
           {droplets}Humidity
        </h2>
        <p className="pt-4 text-2xl">
            {humidity}%
        </p>
     </div>

     <p className="text-sm">
       {getHumidityText(humidity)}
     </p>
    </div>
  )
}

export default Humidity;
