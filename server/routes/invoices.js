const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("invoices");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json(user.invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices"
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      type,
      status,
      item,
      subtotal,
      tax,
      shipping,
      total,
      datePlaced
    } = req.body;

    if (!orderId || !customerName || !type || !status || !item || 
        subtotal === undefined || tax === undefined || 
        shipping === undefined || total === undefined || !datePlaced) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    if (typeof subtotal !== 'number' || subtotal < 0 ||
        typeof tax !== 'number' || tax < 0 ||
        typeof shipping !== 'number' || shipping < 0 ||
        typeof total !== 'number' || total < 0) {
      return res.status(400).json({
        success: false,
        message: "Numeric fields must be positive numbers"
      });
    }

    const dateObj = new Date(datePlaced);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format"
      });
    }

    const newInvoice = {
      _id: new mongoose.Types.ObjectId(),
      orderId,
      userId: req.user.id,
      customerName,
      type,
      status,
      item,
      subtotal,
      tax,
      shipping,
      total,
      datePlaced: dateObj
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.invoices.push(newInvoice);
    await user.save();

    res.status(201).json({
      success: true,
      invoice: newInvoice
    });
  } catch (err) {
    console.error("Error adding invoice:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add invoice"
    });
  }
});

router.delete("/:invoiceId", auth, async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const invoiceIndex = user.invoices.findIndex(
      invoice => invoice._id.toString() === invoiceId
    );

    if (invoiceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    user.invoices.splice(invoiceIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting invoice:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete invoice"
    });
  }
});

router.delete("/bulk/delete", auth, async (req, res) => {
  try {
    const { invoiceIds } = req.body;

    if (!Array.isArray(invoiceIds) || invoiceIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of invoice IDs"
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const invoiceIdsSet = new Set(invoiceIds);
    user.invoices = user.invoices.filter(
      invoice => !invoiceIdsSet.has(invoice._id.toString())
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${invoiceIds.length} invoices`
    });
  } catch (err) {
    console.error("Error deleting invoices:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete invoices"
    });
  }
});

module.exports = router;