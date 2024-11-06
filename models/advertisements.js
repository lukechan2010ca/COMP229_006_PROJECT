const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);