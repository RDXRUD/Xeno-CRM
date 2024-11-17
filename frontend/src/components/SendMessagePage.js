import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SendMessagePage() {
    const [campaigns, setCampaigns] = useState([]); // List of campaigns from API
    const [campaignId, setCampaignId] = useState(''); // Selected campaign ID
    const [status, setStatus] = useState(''); // Status message

    // Fetch campaigns on component mount
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/campaign-management/campaigns');
                setCampaigns(response.data); // Set campaigns data
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                alert('Failed to fetch campaigns. Please check the API.');
            }
        };

        fetchCampaigns();
    }, []);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!campaignId) {
            alert('Please select a campaign.');
            return;
        }

        const payload = {
            campaignId,
        };

        try {
            const response = await axios.post('http://localhost:5001/api/messaging/sendMessage', payload);
            console.log('Message sent:', response.data);
            setStatus('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Send Message</h2>

            {/* Dropdown for Campaign Selection */}
            <div className="mb-3">
                <label htmlFor="campaignId" className="form-label">Select Campaign</label>
                <select
                    id="campaignId"
                    className="form-select"
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                >
                    <option value="">-- Select Campaign --</option>
                    {campaigns.map((campaign) => (
                        <option key={campaign._id} value={campaign._id}>
                            {campaign.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Send Message Button */}
            <button onClick={handleSendMessage} className="btn btn-primary">
                Send Message
            </button>

            {/* Status Display */}
            <p className="mt-3">Status: {status}</p>

            {/* Navigation Links */}
            <div className="mt-4">
                <h4>Go to:</h4>
                <ul>
                <li><Link to="/audience">Audience Page</Link></li>
                    <li><Link to="/campaign-history">Campaign History</Link></li>
                    <li><Link to="/campaign">Add Campaign</Link></li>
                    <li><Link to="/communicationLog">Communication Log</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SendMessagePage;