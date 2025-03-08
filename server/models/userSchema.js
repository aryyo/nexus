const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    stock: Number,
    image: String,
});

const reportSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    url: String,
    dateUploaded: Date,
});

const paymentHistorySchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    status: String,
    plan: String,
});

const settingsSchema = new mongoose.Schema({
    darkMode: Boolean,
    tablePreference: String,
    interfaceTheme: String,
    transparentSidebar: Boolean,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePicture: String,
    address: String,
    phoneNumber: String,
    title: String,
    settings: settingsSchema,
    products: [productSchema],
    reports: [reportSchema],
    paymentHistory: [paymentHistorySchema],
}, {
    timestamps: true,
    collection: "Users"
});

module.exports = mongoose.model('User', userSchema);
