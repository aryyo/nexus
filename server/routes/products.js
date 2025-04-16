const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

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
    const { name, price, stock } = req.body;

    if (!name || !price || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, price, and stock",
      });
    }

    const priceNum = parseFloat(price);
    const priceRegex = /^\d+(\.\d{0,2})?$/;
    if (!priceRegex.test(price) || priceNum <= 0 || priceNum > 999999.99) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number between 0 and 999,999.99 with up to 2 decimal places",
      });
    }

    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0 || stockNum > 999999) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid number between 0 and 999,999",
      });
    }

    let status = "in-stock";
    if (stock <= 0) {
      status = "out-of-stock";
    } else if (stock <= 20) {
      status = "low-stock";
    }

    const newProduct = {
      _id: new mongoose.Types.ObjectId(),
      name,
      price: priceNum,
      stock: Number(stock),
      status,
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

router.put("/:productId", auth, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const productId = req.params.productId;

    if (!name || !price || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, price, and stock",
      });
    }

    const priceNum = parseFloat(price);
    const priceRegex = /^\d+(\.\d{0,2})?$/;
    if (!priceRegex.test(price) || priceNum <= 0 || priceNum > 999999.99) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number between 0 and 999,999.99 with up to 2 decimal places",
      });
    }

    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0 || stockNum > 999999) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid number between 0 and 999,999",
      });
    }

    let status = "in-stock";
    if (stock <= 0) {
      status = "out-of-stock";
    } else if (stock <= 20) {
      status = "low-stock";
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const productIndex = user.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = {
      _id: user.products[productIndex]._id,
      name,
      price: priceNum,
      stock: Number(stock),
      status,
    };

    user.products[productIndex] = updatedProduct;
    await user.save();

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update product",
    });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const productIndex = user.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    user.products.splice(productIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to delete product",
    });
  }
});

module.exports = router;
