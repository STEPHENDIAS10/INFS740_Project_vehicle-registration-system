const mongoose = require("mongoose");

const schema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("cb_reviews", schema);
