import React, { useState } from 'react';
import { createAudienceSegment } from '../services/api';
import { TextField, Button, Grid } from '@mui/material';

const AudienceSegmentForm = () => {
    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [operator, setOperator] = useState('>');
    const [value, setValue] = useState('');
    const [conditions, setConditions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { name, conditions: [{ field, operator, value }] };

        try {
            await createAudienceSegment(data);
            alert('Audience Segment Created');
        } catch (err) {
            console.error('Error creating audience segment', err);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField label="Segment Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Field" value={field} onChange={(e) => setField(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Operator" value={operator} onChange={(e) => setOperator(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Value" value={value} onChange={(e) => setValue(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleSubmit} variant="contained">Create Audience Segment</Button>
            </Grid>
        </Grid>
    );
};

export default AudienceSegmentForm;
