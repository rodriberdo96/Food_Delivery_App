import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DELIVERY_FEE = 2;
const VALID_STATUSES = ["Food Processing", "Out For Delivery", "Delivered"];

const buildOrderItems = async (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Order must contain at least one item");
    }

    const requestedItems = items.map(item => ({
        id: item._id || item.itemId,
        quantity: Number(item.quantity)
    }));

    if (requestedItems.some(item => !item.id || !Number.isInteger(item.quantity) || item.quantity < 1)) {
        throw new Error("Invalid order item data");
    }

    const foods = await foodModel.find({ _id: { $in: requestedItems.map(item => item.id) } });
    const foodsById = new Map(foods.map(food => [food._id.toString(), food]));

    if (foods.length !== requestedItems.length) {
        throw new Error("One or more order items could not be found");
    }

    return requestedItems.map((item) => {
        const food = foodsById.get(item.id.toString());
        return {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            category: food.category,
            quantity: item.quantity
        };
    });
};

// placing user order for frontend
const placeOrder = async (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    try {
        const userId = req.userId || req.body.userId;
        const orderItems = await buildOrderItems(req.body.items);
        const amount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0) + DELIVERY_FEE;

        const newOrder = new orderModel({
            userId,
            items: orderItems,
            amount,
            address: req.body.address,
            payment: false
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: [] });

        const lineItems = orderItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: DELIVERY_FEE * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message || "Error placing order" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Missing orderId" });
        }

        if (success === "true") {
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true });
            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }
            return res.json({ success: true, message: "Payment successful and order verified" });
        }

        await orderModel.findByIdAndDelete(orderId);
        return res.json({ success: false, message: "Payment failed or canceled." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// List orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid order status" });
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
