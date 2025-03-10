const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("products");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json(user.products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch products",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;

    if (!name || !price || !stock || !image) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, price, stock, and image",
      });
    }

    // Determine status based on stock
    let status = "In Stock";
    if (stock <= 0) {
      status = "Out of Stock";
    } else if (stock <= 20) {
      status = "Low Stock";
    }

    const newProduct = {
      name,
      price: Number(price),
      stock: Number(stock),
      status,
      image,
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.products.push(newProduct);
    await user.save();

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to add product",
    });
  }
});

module.exports = router;
