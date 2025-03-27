const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const auth = require("../middleware/auth");

// Valid order types and statuses
const VALID_ORDER_TYPES = ["Shipping", "Pickup"];
const VALID_ORDER_STATUSES = ["Paid", "Cancelled", "Refunded"];

// Get orders for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch orders",
    });
    console.error(err.message);
  }
});

// Create a new order
router.post("/", auth, async (req, res) => {
  try {
    const { id, customerName, type, status, productName, total, date } = req.body;

    // Validate required fields
    if (!id || !customerName || !type || !status || !productName || !total) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate order type
    if (!VALID_ORDER_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order type. Must be one of: ${VALID_ORDER_TYPES.join(", ")}`,
      });
    }

    // Validate order status
    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${VALID_ORDER_STATUSES.join(", ")}`,
      });
    }

    // Validate numeric fields
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total must be a positive number",
      });
    }

    // Validate date format
    const dateObj = date ? new Date(date) : new Date();
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    // Create new order with user ID from auth middleware
    const newOrder = new Order({
      _id: id,
      userId: req.user.id,
      customerName,
      type,
      status,
      product: productName,
      total,
      datePlaced: dateObj,
    });

    // Save to database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create order",
    });
    console.error(err.message);
  }
});

// Bulk delete orders
router.delete("/bulk-delete", auth, async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of order IDs to delete",
      });
    }

    // Find orders that belong to the user and are in the provided list
    const orders = await Order.find({
      _id: { $in: orderIds },
      userId: req.user.id,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found or you don't have permission to delete them",
      });
    }

    // Delete the found orders
    await Order.deleteMany({
      _id: { $in: orders.map(order => order._id) },
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${orders.length} orders`,
    });
  } catch (err) {
    console.error("Error in bulk delete:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to delete orders",
    });
  }
});

// Delete a single order
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you don't have permission to delete it",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to delete order",
    });
  }
});

module.exports = router;
