import React, { useContext } from 'react';
import CampaignContext from '../context/CampaignContext';
import { List, ListItem, ListItemText } from '@mui/material';

const CampaignHistory = () => {
    const { campaigns } = useContext(CampaignContext);

    return (
        <List>
            {campaigns.map((campaign) => (
                <ListItem key={campaign._id}>
                    <ListItemText primary={campaign.name} secondary={`Audience size: ${campaign.audience.length}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default CampaignHistory;
