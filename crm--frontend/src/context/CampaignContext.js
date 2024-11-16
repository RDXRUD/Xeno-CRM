import React, { createContext, useState, useEffect } from 'react';
import { getCampaigns } from '../services/api';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaigns();
                setCampaigns(response.data);
            } catch (err) {
                console.error("Error fetching campaigns", err);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <CampaignContext.Provider value={{ campaigns, setCampaigns }}>
            {children}
        </CampaignContext.Provider>
    );
};

export default CampaignContext;
