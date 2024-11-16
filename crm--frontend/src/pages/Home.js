import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import AudienceSegmentForm from '../components/AudienceSegmentForm';
import CampaignHistory from './Campaigns'; // Campaign History Page
import { Box } from '@mui/system';

const Home = () => {
    const [showCampaignHistory, setShowCampaignHistory] = useState(false);

    const toggleCampaignHistory = () => {
        setShowCampaignHistory(!showCampaignHistory);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Campaign & Audience Management
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Create Audience Segment
                    </Typography>
                    <AudienceSegmentForm />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        variant="outlined"
                        onClick={toggleCampaignHistory}
                        sx={{ marginTop: 2 }}
                    >
                        {showCampaignHistory ? 'Hide Campaigns' : 'Show Campaigns'}
                    </Button>

                    {showCampaignHistory && (
                        <Box sx={{ marginTop: 2 }}>
                            <CampaignHistory />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
