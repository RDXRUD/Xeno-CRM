import React, { useState, useEffect } from 'react';
import { getCampaigns } from '../services/api';
import { Grid, Typography, Paper, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const CampaignHistory = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaigns();
                setCampaigns(response.data);
            } catch (error) {
                console.error("Error fetching campaigns", error);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Campaign History
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <List>
                            {campaigns.length === 0 ? (
                                <ListItem>
                                    <ListItemText primary="No campaigns found" />
                                </ListItem>
                            ) : (
                                campaigns.map((campaign) => (
                                    <Box key={campaign._id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Campaign Name: ${campaign.name}`}
                                                secondary={`Audience Size: ${campaign.audience.length}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CampaignHistory;
