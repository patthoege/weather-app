'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import defaultStates from "../utils/defaultStates";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [ forecast, setForecast ] = useState({});
    const [ geoList, setGeoList ] = useState(defaultStates);
    const [ inputValue, setInputValue ] = useState("");
    const [ activeCityCoords, setActiveCityCoords ] = useState([
        51.5074, -0.1278,
    ]);

    const [ airQuality, setAirQuality ] = useState({});
    const [ fiveDaysForecast, setFiveDaysForecast ] = useState({});
    const [ uvIndex, setUvIndex ] = useState({});

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

            setForecast(res.data);
        } catch (error) {
            console.log("Error fetchn forecast data", error.message);
        }
    };

    // Air Quality
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
        
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetchn air quality data", error.message);
        }
    };

    // 5 Days Forecast
    const fetchFiveDaysForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fivedays?lat=${lat}&lon=${lon}`);

            // console.log("five days forecast data:", res.data)
            setFiveDaysForecast(res.data);
        } catch (error) {
            console.log("Error fetchn 5 days forecast data", error.message);
        }
    };

    // UV Index
    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

            setUvIndex(res.data);
        } catch (error) {
            console.log("Error fetchn uv index data", error.message);
        }
    };

    // Searchbar input handler
    const handlerInput = (e) => {
        setInputValue(e.target.value);

        if(e.target.value === "") {
            setGeoList(defaultStates);
        }
    };

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDaysForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords])

    return (
      <GlobalContext.Provider 
        value={{
            forecast,
            airQuality,
            fiveDaysForecast,
            uvIndex,
            geoList,
            inputValue,
            handlerInput
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
