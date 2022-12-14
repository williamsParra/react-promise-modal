import React, {createContext, useContext, useRef } from "react";

const CustomContext = createContext(null);

export const CustomContextProvider = ({ data, children})=>{
    const awaitingPromiseRef = useRef(null);

    const openModal = () => {
        return new Promise((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    return (
        <CustomContext.Provider value={openModal}>
            {children}
        </CustomContext.Provider>
    )
};

export const useCustomContext = () => useContext(CustomContext);