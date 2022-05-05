import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useGetData = () => {
    const [carData, setData] = useState<any>([]);
    
    const handleDataFetch = async () => {
        const result = await serverCalls.get();
        setData(result)
    }
    // useEffect Hook in action
    useEffect( () => {
        handleDataFetch();
    }, [] )
    return {carData, getData:handleDataFetch}
}