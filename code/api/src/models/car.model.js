const mongoose = require("mongoose");
const bookingModel = require("./booking.model");

const carSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("cb_car", carSchema);
