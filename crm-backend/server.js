const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const dataIngestionRoutes = require('./routes/dataIngestion');
const campaignManagementRoutes = require('./routes/campaignManagement');
const swaggerDocsRoutes = require('./routes/swaggerDocs');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/data-ingestion', dataIngestionRoutes);
app.use('/api/campaign-management', campaignManagementRoutes);
app.use('/', swaggerDocsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
