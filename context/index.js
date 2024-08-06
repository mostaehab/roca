"use client";
import React, { createContext, useContext, useState } from "react";

const appContext = createContext();

export const ContextProvider = ({ children }) => {
  const [test, setTest] = useState("hello");

  return <appContext.Provider value={{ test }}>{children}</appContext.Provider>;
};

export const AppContext = () => {
  return useContext(appContext);
};
