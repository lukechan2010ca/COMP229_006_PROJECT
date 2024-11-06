const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    advertisementId: { type: Schema.Types.ObjectId, ref: 'Advertisement', required: true },
    questionText: { type: String, required: true },
    answerText: { type: String },
    anonymousUserId: { type: String }, // Unique ID to track anonymous user sessions
    createdAt: { type: Date, default: Date.now },
    answeredAt: { type: Date }
});

module.exports = mongoose.model('Question', QuestionSchema);