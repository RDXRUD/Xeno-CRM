const mongoose = require('mongoose');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection failed", err));

// Sample Data
const customers = [
    { name: "Alice", email: "alice@example.com", totalSpending: 12000, visits: 3, lastVisit: "2024-10-01" },
    { name: "Bob", email: "bob@example.com", totalSpending: 8000, visits: 2, lastVisit: "2024-11-10" },
    { name: "Charlie", email: "charlie@example.com", totalSpending: 15000, visits: 7, lastVisit: "2024-09-15" }
];

const orders = [
    { customerId: "CUSTOMER_ID_1", amount: 5000 },
    { customerId: "CUSTOMER_ID_2", amount: 3000 },
    { customerId: "CUSTOMER_ID_3", amount: 7000 }
];

// Insert Data
async function populateData() {
    try {
        await Customer.insertMany(customers);
        console.log("Customers added successfully");

        // Replace with actual customer IDs after inserting customers
        orders[0].customerId = (await Customer.findOne({ email: "alice@example.com" }))._id;
        orders[1].customerId = (await Customer.findOne({ email: "bob@example.com" }))._id;
        orders[2].customerId = (await Customer.findOne({ email: "charlie@example.com" }))._id;

        await Order.insertMany(orders);
        console.log("Orders added successfully");

        mongoose.disconnect();
    } catch (err) {
        console.error("Error populating data:", err);
    }
}

populateData();
