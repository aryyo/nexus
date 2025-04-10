const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  stock: Number,
});

const invoiceSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: String,
  customerName: String,
  type: String,
  status: String,
  item: String,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  datePlaced: Date,
})

const settingsSchema = new mongoose.Schema({
  tablePreference: String,
  interfaceTheme: String,
  transparentSidebar: Boolean,
  timeFrame: String,
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
    invoices: [invoiceSchema],
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
