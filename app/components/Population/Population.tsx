"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { people } from '@/app/utils/Icons';
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Population() {
    const { fiveDaysForecast } = useGlobalContext();
    const { city } = fiveDaysForecast;

    // check if population data is available,
    //check if necessary properties are available
    if (!fiveDaysForecast || !city) {
        return <Skeleton className="h-[12rem] w-full" />;
    }
    
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border border-gray-400 
    rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
            {people} Population
        </h2>
        <p className={`pt-4 text-2xl ${!city.population ? 'text-rose-500 text-lg' : ''}`}>
            {city.population ? formatNumber(city.population) : "Data not available"}
        </p>

      </div>

      <p className="text-sm">Latest UN population data for {city.name}</p>
    </div>
  )
}

export default Population;
