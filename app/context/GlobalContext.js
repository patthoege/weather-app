'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [ forecast, setForecast ] = useState({});
    const [ airQuality, setAirQuality ] = useState({});
    const [ fiveDaysForecast, setFiveDaysForecast ] = useState({});

    const fetchForecast = async () => {
        try {
            const res = await axios.get("api/weather");

            setForecast(res.data);
        } catch (error) {
            console.log("Error fetchn forecast data", error.message);
        }
    };

    // Air Quality
    const fetchAirQuality = async () => {
        try {
            const res = await axios.get("api/pollution");
        
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetchn air quality data", error.message);
        }
    };

    // 5 Days Forecast
    const fetchFiveDaysForecast = async () => {
        try {
            const res = await axios.get("api/fivedays");

            console.log("five days forecast data:", res.data)
            setFiveDaysForecast(res.data);
        } catch (error) {
            console.log("Error fetchn 5 days forecast data", error.message);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDaysForecast();
    }, [])

    return (
      <GlobalContext.Provider 
        value={{
            forecast,
            airQuality,
            fiveDaysForecast
            }}
       >
          <GlobalContextUpdate.Provider>
              {children}
          </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
