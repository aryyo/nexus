const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  stock: Number,
  image: {
    fileType: String,
    data: Buffer
  },
});

const settingsSchema = new mongoose.Schema({
  tablePreference: String,
  interfaceTheme: String,
  transparentSidebar: Boolean,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    profilePicture: String,
    address: String,
    phoneNumber: String,
    settings: settingsSchema,
    products: [productSchema],
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
