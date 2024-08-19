"use client";
import { 
  atmosphere,
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow, 
  thunderstorm 
} from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useGlobalContext } from '@/app/context/GlobalContext';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import moment from 'moment';
import { kelvinToCelsius } from '@/app/utils/misc';

function DailyForecast() {
  const { forecast, fiveDaysForecast } = useGlobalContext();

  const { weather } = forecast;

  const { city, list } = fiveDaysForecast;

  // check if daily forecast data is available,
  //check if necessary properties are available
  if (!fiveDaysForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;    
  }

  if (!forecast || !weather ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // filter list of today'sdaily forecast
  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number;} }) => {
    return forecast.dt_txt.startsWith(todayString);
  });

  const { main: weatherMain } = weather[0];

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
    <div className="air-polution pt-6 px-4 h-[12rem] border border-gray-400 rounded-lg flex flex-col gap-8
    dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 xl:col-span-2">
      <div className="h-full flex gap-10 overflow-hidden">
      
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-[2rem] text-rose-500 flex items-center">
              No Data Available
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                        key={forecast.dt_txt}
                      >
                        <p className=" text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {kelvinToCelsius(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
