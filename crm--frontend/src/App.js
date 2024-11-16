import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CampaignProvider } from './context/CampaignContext';
import AudienceSegmentForm from './components/AudienceSegmentForm';
import CampaignHistory from './components/CampaignHistory';
import SendMessage from './components/SendMessage';

function App() {
    return (
        <CampaignProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<AudienceSegmentForm />} />
                    <Route path="/campaigns" element={<CampaignHistory />} />
                    <Route path="/send-message/:campaignId" element={<SendMessage />} />
                </Routes>
            </Router>
        </CampaignProvider>
    );
}

export default App;
