const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    itemTitle: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;