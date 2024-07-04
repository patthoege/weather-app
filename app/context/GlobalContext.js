'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [ forecast, setForecast ] = useState({});
    const [ airQuality, setAirQuality ] = useState({});

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

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
    }, [])

    return (
      <GlobalContext.Provider value={{ forecast, airQuality }}>
          <GlobalContextUpdate.Provider>
              {children}
          </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
