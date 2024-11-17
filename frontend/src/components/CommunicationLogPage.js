import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CommunicationLogPage() {
    const [communicationLogs, setCommunicationLogs] = useState([]); // List of communication logs from API
    const [status, setStatus] = useState(''); // Status message for loading/error

    // Fetch communication logs on component mount
    useEffect(() => {
        const fetchCommunicationLogs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/messaging/communication-log');
                setCommunicationLogs(response.data.communicationLogs); // Set communication logs data
            } catch (error) {
                console.error('Error fetching communication logs:', error);
                setStatus('Failed to fetch communication logs. Please try again.');
            }
        };

        fetchCommunicationLogs();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Communication Logs</h2>

            {/* Display status message */}
            {status && <p className="text-danger">{status}</p>}

            {/* Communication Logs Table */}
            {communicationLogs.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Message</th>
                            <th>Campaign ID</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {communicationLogs.map((log) => (
                            <tr key={log._id}>
                                <td>{log.customerId}</td>
                                <td>{log.message}</td>
                                <td>{log.campaignId}</td>
                                <td>{log.status}</td>
                                <td>{new Date(log.createdAt).toLocaleString()}</td>
                                <td>{new Date(log.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No communication logs found.</p>
            )}
            <div>
                    <li><Link to="/audience">Audience Page</Link></li>
                    <li><Link to="/campaign-history">Campaign History</Link></li>
                    <li><Link to="/campaign">Add Campaign</Link></li>
                    <li><Link to="/sendMessage">Send Message</Link></li>
            </div>
        </div>
    );
}

export default CommunicationLogPage;