"use client";
import { error } from "pdf-lib";
import { Result } from "postcss";
import React, { createContext, useContext, useState } from "react";
const axios = require("axios").default;

const appContext = createContext();

export const ContextProvider = ({ children }) => {
  const apiUrl = process.env.NEXT_PUBLIC_ROCA_API_URL;
  const [currentCycle, setCurrentCycle] = useState(null);
  const [toBeSigned, setToBeSigned] = useState(null);

  // Register User Request
  const onRegisterUser = (registerUserData) => {
    return fetch(`${apiUrl}/Authentication/RegisterUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUserData),
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error; // Re-throw the error so it can be caught by the caller
      });
  };

  // Login User Request
  const fetchLoginUser = async (loginUserData) => {
    try {
      const response = await fetch(`${apiUrl}/Authentication/LoginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUserData),
      });

      if (!response.ok) {
        throw new Error(`There is an error: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        localStorage.setItem("authData", JSON.stringify(data));
        localStorage.setItem("token", data.authenticationResult.token);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //Create Cycle
  const fetchCreateCycle = async (cycleData) => {
    try {
      const response = await fetch(`${apiUrl}/UserCycle/User/CreateCycle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(cycleData),
      });

      if (!response.ok) {
        return;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGetCycle = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/UserCycle/GetCyclesByUserId/0?userId=${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok && !response) {
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //Upload files
  const fetchUploadFiles = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/Attachement/add-attachment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        return;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGetFiles = async (cycleId) => {
    try {
      const response = await fetch(
        `${apiUrl}/Attachement/get-attachments-by-header-id/${cycleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return;
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCycles = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/UserCycle/GetCycles?page=1&rows=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response || !response.ok) {
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDownlaodFile = async (fileId) => {
    try {
      const response = await fetch(
        `${apiUrl}/Attachement/open-attachment/${fileId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response || !response.ok) {
        return;
      }

      const data = await response.blob();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFiles = async (fileId) => {
    try {
      const response = await fetch(
        `${apiUrl}/Attachement/delete-attachment?id=${fileId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCycle = async (cycleId) => {
    try {
      const response = await fetch(
        `${apiUrl}/UserCycle/DeleteCycle/${cycleId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response) {
        return;
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getCycleById = async (cycleId) => {
    try {
      const response = await fetch(`${apiUrl}/UserCycle/GetCycle/${cycleId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response) {
        return;
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <appContext.Provider
      value={{
        onRegisterUser,
        fetchLoginUser,
        fetchCreateCycle,
        fetchGetCycle,
        fetchUploadFiles,
        setCurrentCycle,
        fetchGetFiles,
        fetchAllCycles,
        setToBeSigned,
        fetchDownlaodFile,
        deleteFiles,
        onDeleteCycle,
        getCycleById,
        toBeSigned,
        currentCycle,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const AppContext = () => {
  return useContext(appContext);
};
