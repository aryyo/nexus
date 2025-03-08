const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const auth = require("../middleware/auth");

// Get orders for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch orders'
    });
    console.error(err.message);
  }
});

module.exports = router;
