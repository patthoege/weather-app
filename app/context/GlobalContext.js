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
    const [ activeCityCoords, setActiveCityCoords ] = useState([40.7128, -74.0060]);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
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

    // get current location
const handleLocationRequest = async () => {
    // console.log("Clicked my location button...");
    setLoadingLocation(true);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Set active city coordinates to the current location
            setActiveCityCoords([lat, lon]);

            // Fetch weather data for the current location
            await fetchForecast(lat, lon);
            await fetchAirQuality(lat, lon);
            await fetchFiveDaysForecast(lat, lon);
            await fetchUvIndex(lat, lon);

            setLoadingLocation(false);
        }, (error) => {
            // console.error("Error getting location", error);
            setAlertMessage("Unable to retrieve your location. Please try the searchbar.");
            setAlertType("error");
            setActiveCityCoords([40.7128, -74.0060]);
            setLoadingLocation(false);
        });
    } else {
        // console.error("Geolocation is not supported by this browser.");
        setAlertMessage("Geolocation is not supported by your browser.");
        setAlertType("error");
        setActiveCityCoords([40.7128, -74.0060]);
        setLoadingLocation(false);
    }
};

    useEffect(() => {
        // console.log("Active city coordinates changed:", activeCityCoords); 
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDaysForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords])

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

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
            handleLocationRequest,
            loadingLocation,
            alertMessage,
            alertType,
            }}
       >
          <GlobalContextUpdate.Provider
            value={{ 
                setActiveCityCoords,
                setAlertMessage,
                setAlertType,
            }}
          >
              {children}
          </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
