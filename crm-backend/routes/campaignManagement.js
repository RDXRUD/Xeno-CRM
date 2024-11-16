const express = require('express');
const router = express.Router();
const AudienceSegment = require('../models/AudienceSegment');
const Customer = require('../models/customer');
const Campaign = require('../models/Campaign');
const pubSub = require('../utils/pubSub'); // Ensure pubSub utility is implemented

// Audience Creation API
router.post('/audience-segment', async (req, res) => {
    try {
        const { name, conditions } = req.body;

        // Construct MongoDB query based on conditions
        let query = {};
        conditions.forEach((condition) => {
            const { field, operator, value } = condition;
            switch (operator) {
                case '>':
                    query[field] = { $gt: value };
                    break;
                case '<':
                    query[field] = { $lt: value };
                    break;
                case '=':
                    query[field] = value;
                    break;
                case '>=':
                    query[field] = { $gte: value };
                    break;
                case '<=':
                    query[field] = { $lte: value };
                    break;
                default:
                    throw new Error(`Unsupported operator: ${operator}`);
            }
        });

        // Fetch audience and calculate size
        const audience = await Customer.find(query);
        const audienceSegment = new AudienceSegment({
            name,
            filters: conditions,
            audienceSize: audience.length,
        });
        await audienceSegment.save();

        res.status(201).json({
            message: 'Audience segment created successfully',
            audienceSize: audience.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Campaign History API
router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find()
            .populate('audience') // Ensure audience is properly populated
            .sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Send Messages API
router.post('/send-message', async (req, res) => {
    try {
        const { campaignId } = req.body;

        const campaign = await Campaign.findById(campaignId).populate('audience');
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        campaign.audience.forEach((customer) => {
            const logEntry = {
                campaignId: campaign._id,
                customerId: customer._id,
                status: Math.random() < 0.9 ? 'SENT' : 'FAILED', // 90% success rate
                sentAt: new Date(),
            };

            // Publish to message broker (simulated)
            pubSub.publish('delivery-receipt', logEntry);
        });

        res.status(200).json({
            message: 'Messages sent successfully and queued for delivery processing.',
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle Delivery Receipts
pubSub.subscribe('delivery-receipt', async (logEntry) => {
    try {
        const CommunicationLog = require('../models/communicationLog');
        const communicationLog = new CommunicationLog(logEntry);
        await communicationLog.save();
        console.log('Delivery receipt logged:', logEntry);
    } catch (err) {
        console.error('Error logging delivery receipt:', err);
    }
});

module.exports = router;
