import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// add items to user cart

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cart = user.cartData;
        const index = cart.findIndex(item => item.itemId === itemId);

        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ itemId, quantity: 1 });
        }

        user.cartData = cart;
        await user.save();

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const cart = user.cartData;
        const index = cart.findIndex(item => item.itemId === itemId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // remove item completely
        }

        user.cartData = cart;
        await user.save();

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// fetch user cart items
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, data: user.cartData });
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export {addToCart, removeFromCart, getCart}