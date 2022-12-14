import React, {createContext, useContext, useState, useEffect } from "react";

const CustomContext = createContext(null);

export const CustomContextProvider = ({ data, children})=>{
    const [currentData,setCurrentData] = useState(data || {});

    const handleChange = (newData)=>{
        setCurrentData({...currentData,...newData})
    }

    return (
        <CustomContext.Provider value={{currentData, handleChange}}>
            {children}
        </CustomContext.Provider>
    )
};

export const useCustomContext = () => useContext(CustomContext);