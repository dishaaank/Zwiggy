import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (userData) {
            if (!userData.cartData) {
                userData.cartData = {};
            }
            if (!userData.cartData[req.body.itemId]) {
                userData.cartData[req.body.itemId] = 1;
            } else {
                userData.cartData[req.body.itemId] += 1;
            }
            await userData.save();
            res.json({ success: true, message: "Added to cart" });
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (userData) {
            if (userData.cartData && userData.cartData[req.body.itemId] > 0) {
                userData.cartData[req.body.itemId] -= 1;
                if (userData.cartData[req.body.itemId] === 0) {
                    delete userData.cartData[req.body.itemId];
                }
            }
            await userData.save();
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (userData) {
            let cartData = userData.cartData || {}; // Initialize cartData to an empty object if it doesn't exist
            res.json({ success: true, cartData });
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addToCart, removeFromCart, getCart }