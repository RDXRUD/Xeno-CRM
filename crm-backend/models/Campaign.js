const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    audience: { type: Array, required: true },
    message: { type: String, required: false }, // Mark as optional if not mandatory
    segmentId: { type: String, required: false }, // Mark as optional if not mandatory
}, { timestamps: true });

module.exports = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
