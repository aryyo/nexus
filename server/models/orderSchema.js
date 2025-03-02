const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,//{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    customerName: String,
    type: String,
    status: String,
    product: String,
    total: Number,
    datePlaced: Date,
}, {
    timestamps: true, 
    collection: "Orders"
});

module.exports = mongoose.model('Order', orderSchema);
