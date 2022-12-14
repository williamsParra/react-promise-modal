import React,{useEffect} from 'react';
import {useCustomContext} from '../hooks/CustomContext';

const Info = () => {
    const contexto = useCustomContext();

    return (
    <div>
        <p>{contexto && contexto.currentData && contexto.currentData.name}</p>
        <p>{contexto && contexto.currentData && contexto.currentData.pais}</p>

    </div>
    )
}

export default Info