import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CampaignHistoryPage() {
    const [campaigns, setCampaigns] = useState([]);

    // Fetch campaigns from the API
    useEffect(() => {
        const fetchCampaignHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/campaign-management/campaigns');
                setCampaigns(response.data); // Set the fetched campaigns
            } catch (error) {
                console.error('Error fetching campaign history:', error);
                alert('Failed to fetch campaign history. Please check the API.');
            }
        };

        fetchCampaignHistory();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Campaign History</h2>
            <ul className="list-group">
                {campaigns.map((campaign) => (
                    <li key={campaign._id} className="list-group-item">
                        <h5>{campaign.name}</h5>
                        <p><strong>Segment:</strong> {campaign.segmentId.name}</p>
                        <p><strong>Audience Size:</strong> {campaign.audienceSize}</p>
                        <p><strong>Sent Count:</strong> {campaign.sentCount}</p>
                        <p><strong>Failed Count:</strong> {campaign.failedCount}</p>
                        <p><strong>Sent At:</strong> {new Date(campaign.sentAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            {/* Navigation Links */}
            <div className="mt-4">
                <h4>Go to:</h4>
                <ul>
                    <li><Link to="/audience">Audience Page</Link></li>
                    <li><Link to="/campaign">Add Campaign</Link></li>
                    <li><Link to="/sendMessage">Send Message</Link></li>
                    <li><Link to="/communicationLog">Communication Log</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default CampaignHistoryPage;