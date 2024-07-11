"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { calender } from '@/app/utils/Icons';
import { kelvinToCelsius, UnixToDay } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function FiveDaysForecast() {
    const { fiveDaysForecast } = useGlobalContext();
    const { city, list } = fiveDaysForecast;
    //check if forecast data is available
    if (
        !fiveDaysForecast ||
        !city ||
        !list
    ) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

   const FiveDaysData = (
    dailyData: {
        main: { temp_min: number; temp_max: number; };
        dt: number;
    }[]
    ) => {
       let minTemp = Number.MAX_VALUE;
       let maxTemp = Number.MIN_VALUE;
       dailyData.forEach(
        ( day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
            if (day.main.temp_min < minTemp) {
                minTemp = day.main.temp_min;
            } if (day.main.temp_max > maxTemp) {
                maxTemp = day.main.temp_max;
            }
        }
      );

      return {
        day: UnixToDay(dailyData[0].dt),
        minTemp: kelvinToCelsius(minTemp),
        maxTemp: kelvinToCelsius(maxTemp),
     };
   };

   const dailyForecast = []

   for(let i = 0; i < 40; i += 8) {
     const dailyData = list.slice(i, i + 5);

     dailyForecast.push(FiveDaysData(dailyData));
   }
   console.log("dailyForecast", dailyForecast);
  return (
    <div className="pt-6 pb-5 px-4 flex-1 border border-gray-400 rounded-lg flex flex-col justify-between
         dark:bg-dark-grey dark:border-gray-400 shadow-md dark:shadow-none"
        >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5 Days Forecast for {city.name}
        </h2>
        <div className="forecast-list pt-3">
        {dailyForecast.map((day, i) => {
          return (
            <div 
                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2" 
                key={i}
            >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-center">
                    <span>(low)</span>
                    <span>(high)</span>
                </p>
                <div className='flex flex-1 items-center justify-center gap-4'>
                    <p className="font-bold">{day.minTemp.toFixed(0)}°C</p>
                    <div className="temperature-progress flex-1 w-full h-2 rounded-lg"></div>
                    <p className="font-bold">{day.maxTemp.toFixed(0)}°C</p>
                </div>
            </div>
            )})}
        </div>
     </div>
    </div>
  )
}

export default FiveDaysForecast
