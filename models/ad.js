const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [],
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    expirationDate: { type: Date, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    collection: "ad"
}
);

module.exports = mongoose.model('Ad', AdSchema);