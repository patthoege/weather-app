"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { eye } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Visibility() {
    const { forecast } = useGlobalContext();

    // check if visibility data is available,
    if (
        !forecast ||
        !forecast?.visibility
    ) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { visibility } = forecast;

    const getVisibilityInfo = () => {
        const visibilityinKm = Math.round(visibility / 1000);

        if (visibilityinKm > 10) {
            return "Excellent: Clear and vast view";
        } if (visibilityinKm > 5) {
            return "Good: Easily navigable";
        } if (visibilityinKm > 2) {
            return "Moderate: Some limitations";
        } if (visibilityinKm <= 2) {
            return "Poor: Restricted and unclear"; 
        } 

        return "Unavailable: Visibility data not available";
    }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border border-gray-400 
    rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
           {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">
           {Math.round(visibility / 1000)} km
        </p>
     </div>
     <p className="text-sm">
        {getVisibilityInfo()}
     </p>
    </div>
  )
}

export default Visibility;
