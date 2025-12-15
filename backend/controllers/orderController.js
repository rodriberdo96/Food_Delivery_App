import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: [] });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2  * 100,
            },
            quantity: 1,
        });
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?canceled=true&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success=== "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.json({ success: true, message: "Payment successful and order verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return  res.json({ success: false, message: "Payment failed or canceled." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
}

// user orders for frontend

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }   
};

//List orders for admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

//API for updating order status
const updateStatus= async (req,res)=>{
    try {
        const {orderId, status}= req.body;
        await orderModel.findByIdAndUpdate(orderId, {status: status});
        res.json({success:true, message:"Order status updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error updating order status"});
    }



}


export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};