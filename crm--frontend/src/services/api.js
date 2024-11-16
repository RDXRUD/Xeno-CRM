import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createAudienceSegment = async (data) => {
    return await axios.post(`${API_URL}/campaign-management/audience-segment`, data);
};

export const getCampaigns = async () => {
    return await axios.get(`${API_URL}/campaign-management/campaigns`);
};

export const sendMessages = async (campaignId) => {
    return await axios.post(`${API_URL}/campaign-management/send-message`, { campaignId });
};
