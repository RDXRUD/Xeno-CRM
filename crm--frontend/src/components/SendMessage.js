import React, { useState } from 'react';
import { sendMessages } from '../services/api';
import { Button } from '@mui/material';

const SendMessage = ({ campaignId }) => {
    const [loading, setLoading] = useState(false);

    const handleSendMessages = async () => {
        setLoading(true);
        try {
            await sendMessages(campaignId);
            alert('Messages sent successfully');
        } catch (err) {
            alert('Error sending messages');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleSendMessages} variant="contained" disabled={loading}>
            {loading ? 'Sending...' : 'Send Messages'}
        </Button>
    );
};

export default SendMessage;
