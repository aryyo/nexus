const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const auth = require("../middleware/auth");

const VALID_ORDER_TYPES = ["Shipping", "Pickup"];
const VALID_ORDER_STATUSES = ["Paid", "Cancelled", "Refunded"];

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

router.post("/", auth, async (req, res) => {
  try {
    const { id, customerName, type, status, productName, total, date } = req.body;

    if (!id || !customerName || !type || !status || !productName || !total) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!VALID_ORDER_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order type. Must be one of: ${VALID_ORDER_TYPES.join(", ")}`,
      });
    }

    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${VALID_ORDER_STATUSES.join(", ")}`,
      });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total must be a positive number",
      });
    }

    const dateObj = date ? new Date(date) : new Date();
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

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

router.delete("/bulk-delete", auth, async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of order IDs to delete",
      });
    }

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

router.put("/:id", auth, async (req, res) => {
  try {
    const { customerName, type, status, productName, total, date } = req.body;

    if (!customerName || !type || !status || !productName || !total) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!VALID_ORDER_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order type. Must be one of: ${VALID_ORDER_TYPES.join(", ")}`,
      });
    }

    if (!VALID_ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${VALID_ORDER_STATUSES.join(", ")}`,
      });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total must be a positive number",
      });
    }

    const dateObj = date ? new Date(date) : new Date();
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you don't have permission to update it",
      });
    }

    order.customerName = customerName;
    order.type = type;
    order.status = status;
    order.product = productName;
    order.total = total;
    order.datePlaced = dateObj;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update order",
    });
  }
});

module.exports = router;
