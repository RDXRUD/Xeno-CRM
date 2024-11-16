const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');
const pubSub = require('../utils/pubSub');

// Audience Creation
exports.createAudience = async (req, res) => {
    try {
        const { conditions, name } = req.body;

        let query = {};
        conditions.forEach((condition) => {
            const field = condition.field;
            const operator = condition.operator;
            const value = condition.value;

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
            }
        });

        const audience = await Customer.find(query);
        const campaign = new Campaign({ name, audience });
        await campaign.save();

        res.status(201).json({
            message: 'Audience segment created successfully',
            audienceSize: audience.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Campaign History
exports.getCampaignHistory = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Send Messages
exports.sendMessages = async (req, res) => {
    try {
        const { campaignId } = req.body;
        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        campaign.audience.forEach((customer) => {
            const logEntry = {
                campaignId: campaign._id,
                customerId: customer._id,
                status: Math.random() < 0.9 ? 'SENT' : 'FAILED',
            };

            // Publish to message broker
            pubSub.publish('delivery-receipt', logEntry);
        });

        res.status(200).json({ message: 'Messages sent and queued for receipt processing' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const CommunicationLog = require('../models/CommunicationLog');
const pubSub = require('../utils/pubSub');

// Handle Delivery Receipts
pubSub.subscribe('delivery-receipt', async (logEntry) => {
    try {
        const communicationLog = new CommunicationLog(logEntry);
        await communicationLog.save();
        console.log('Delivery receipt logged:', logEntry);
    } catch (err) {
        console.error('Error saving delivery receipt:', err);
    }
});

// // Handle Delivery Receipts
// pubSub.subscribe('delivery-receipt', async (logEntry) => {
//     const communicationLog = new CommunicationLog(logEntry);
//     await communicationLog.save();
// });
