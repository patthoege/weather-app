"use client";

import { useGlobalContextUpdate } from '@/app/context/GlobalContext';
import defaultStates from '@/app/utils/defaultStates';
import React from 'react'

function TopCities() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedState = (state: typeof defaultStates[number]) => {
    setActiveCityCoords([state.lat, state.lon]);
  };

  return (
    <div>
        <h2 className="flex items-center gap-2 font-medium">
            Top Large Cities
        </h2>
        <div className="flex flex-col gap-4">
            {defaultStates.map((state, index) => {
                return (
                <div
                 className="border border-gray-400 rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                 key={index}
                 onClick={() => getClickedState(state)}
                >
                   <p className="px-6 py-4">{state.name}</p> 
                </div>
                )
            })}
            
                
        </div>
    </div>
  )
}

export default TopCities
