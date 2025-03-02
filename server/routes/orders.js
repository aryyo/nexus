const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send(err.message);
    console.error(err.message)
  }
});

module.exports = router;
