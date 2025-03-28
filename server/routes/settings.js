const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const auth = require("../middleware/auth");

// Get user settings
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json(user.settings);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user settings"
    });
  }
});

// Update user settings
router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.settings = {
      ...user.settings,
      ...req.body
    };

    await user.save();
    res.status(200).json(user.settings);
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update user settings"
    });
  }
});

module.exports = router;
