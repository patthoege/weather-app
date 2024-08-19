'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [ forecast, setForecast ] = useState({});
    const [ geoList, setGeoList ] = useState(defaultStates);
    const [ inputValue, setInputValue ] = useState("");
    const [ activeCityCoords, setActiveCityCoords ] = useState([48.3665, 10.8944]);

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
    const handleInput = (e) => {
        // console.log("input", e.target.value)
        setInputValue(e.target.value);

        if(e.target.value === "") {
            setGeoList(defaultStates);
        }
    };

    // Geocode
    const fetchGeoCodeData = async (search) => {
        // console.log("search geo", search)
        try {
            const res = await axios.get(`api/geocode?search=${search}`);
            // console.log("geocode data:", res.data)
            setGeoList(res.data);
        } catch (error) {
            console.log("Error fetchn geo code data", error.message);
        }
    };

    // debounce function
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            // console.log("search", search)
          fetchGeoCodeData(search);
        }, 500);
    
        if (inputValue) {
          debouncedFetch(inputValue);
        }
    
        return () => debouncedFetch.cancel();
      }, [inputValue]);

    useEffect(() => {
        // console.log("Active city coordinates changed:", activeCityCoords); 
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
            handleInput,
            setActiveCityCoords,
            }}
       >
          <GlobalContextUpdate.Provider
            value={{ 
                setActiveCityCoords
            }}
          >
              {children}
          </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
