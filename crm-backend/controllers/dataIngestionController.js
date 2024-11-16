const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.addCustomer = async (req, res) => {
    try {
        const { name, email, totalSpending, visits, lastVisit } = req.body;
        const customer = new Customer({ name, email, totalSpending, visits, lastVisit });
        await customer.save();
        res.status(201).json({ message: 'Customer added successfully', customer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addOrder = async (req, res) => {
    try {
        const { customerId, amount } = req.body;
        const order = new Order({ customerId, amount });
        await order.save();
        res.status(201).json({ message: 'Order added successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.test = async (req, res) => {
//     try {
//         // const { customerId, amount } = req.body;
//         // const order = new Order({ customerId, amount });
//         // await order.save();
//         res.status(201).json({ message: 'HOLLA' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};