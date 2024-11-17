import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CampaignPage() {
    const [audiences, setAudiences] = useState([]); // List of audiences from API
    const [audienceId, setAudienceId] = useState(''); // Selected audience ID
    const [campaignName, setCampaignName] = useState(''); // Campaign name
    const [status, setStatus] = useState(''); // Status message

    // Fetch audiences on component mount
    useEffect(() => {
        const fetchAudiences = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/campaign-management/audience-segments');
                setAudiences(response.data); // Set audience data
            } catch (error) {
                console.error('Error fetching audiences:', error);
                alert('Failed to fetch audiences. Please check the API.');
            }
        };

        fetchAudiences();
    }, []);

    // Handle adding a new campaign
    const handleSendMessage = async () => {
        if (!audienceId || !campaignName) {
            alert('Please select an audience and enter a campaign name.');
            return;
        }

        // Find the selected audience details
        const selectedAudience = audiences.find((audience) => audience._id === audienceId);

        if (!selectedAudience) {
            alert('Invalid audience selected.');
            return;
        }

        const campaignData = {
            segmentId: selectedAudience._id,
            name: campaignName,
            audienceSize: selectedAudience.audienceSize,
        };

        try {
            const response = await axios.post('http://localhost:5001/api/campaign-management/campaigns', campaignData);
            console.log('Campaign created:', response.data);
            setStatus('Campaign created successfully!');
        } catch (error) {
            console.error('Error creating campaign:', error);
            setStatus('Failed to create campaign. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Campaign</h2>

            {/* Dropdown for Audience */}
            <div className="mb-3">
                <label htmlFor="audienceId" className="form-label">Select Audience</label>
                <select
                    id="audienceId"
                    className="form-select"
                    value={audienceId}
                    onChange={(e) => setAudienceId(e.target.value)}
                >
                    <option value="">-- Select Audience --</option>
                    {audiences.map((audience) => (
                        <option key={audience._id} value={audience._id}>
                            {audience.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Campaign Name Input */}
            <div className="mb-3">
                <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter Campaign Name"
                    className="form-control"
                />
            </div>

            {/* Submit Button */}
            <button onClick={handleSendMessage} className="btn btn-primary">
                Create Campaign
            </button>

            {/* Status Display */}
            <p className="mt-3">Status: {status}</p>

            {/* Navigation Links */}
            <div className="mt-4">
                <h4>Go to:</h4>
                <ul>
                    <li><Link to="/audience">Audience Page</Link></li>
                    <li><Link to="/campaign-history">Campaign History</Link></li>
                    <li><Link to="/communicationLog">Communication Log</Link></li>
                    <li><Link to="/sendMessage">Send Message</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default CampaignPage;