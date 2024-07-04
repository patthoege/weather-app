'use client';
import React, { createContext, useState, useContext } from "react";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {

    return (
      <GlobalContext.Provider value="Hello">
          <GlobalContextUpdate.Provider>
              {children}
          </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
