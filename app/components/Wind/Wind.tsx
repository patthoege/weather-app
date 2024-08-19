"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { wind } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

function Wind() {
    const { forecast } = useGlobalContext();

    const windSpeed = forecast?.wind?.speed;
    const windDirection = forecast?.wind?.deg;

    //check if necessary wind properties are available
    if (
        !windSpeed ||
        !windDirection
    ) {
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
    }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border border-gray-400 
    rounded-lg flex flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{wind}Wind</h2>
      <div className="compass relative flex items-center justify-center mx-auto" style={{ width: '110px', height: '110px' }}>
        <div className="image relative" style={{ width: '100%', height: '100%' }}>
            <Image 
                src="/compass.svg"
                alt="compass" 
                fill
                style={{ 
                  objectFit: "contain",
                }}
            />
            <Image
                className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
                style={{
                  transform: `translateX(-50%) rotate(${windDirection}deg)`,
                  width: "100%",
                  height: "auto", 
                  maxHeight: "100%",
                }}
                src="/compass_arrow.svg" 
                alt="compass arrow" 
                width={110} 
                height={110} 
            />
        </div>
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-sx dark:text-white font-medium">
            {Math.round(windSpeed)}m/s
        </p>
      </div>
    </div>
  )
}

export default Wind;
