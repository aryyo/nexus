const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    
    cb(null, true);
  }
}).single('profilePicture');

// Email validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data"
    });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (req.body.email !== undefined && req.body.email !== user.email) {
      if (!validateEmail(req.body.email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      const existingUser = await User.findOne({ 
        email: req.body.email,
        _id: { $ne: req.user.id } 
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered"
        });
      }
    }

    const allowedUpdates = ['name', 'email', 'phoneNumber', 'address', 'profilePicture'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update user data"
    });
  }
});

router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long"
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({
      success: false,
      message: "Failed to change password"
    });
  }
});

router.post("/profile-picture", auth, (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File size should be less than 5MB'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Error uploading file'
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided"
        });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      user.profilePicture = base64Image;
      await user.save();

      res.status(200).json({
        success: true,
        profilePicture: base64Image
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload profile picture"
      });
    }
  });
});

module.exports = router; 