const mongoose = require("mongoose");
const moment = require("moment");

const bookingSchema = mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    noOfDays: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
}, {
    timestamps: true
});

bookingSchema.pre("save", function (next) {
    this.startDate = new Date(this.day);
    this.endDate = moment(new Date(this.day)).add(this.noOfDays, "days").toDate()
    next();
});

module.exports = mongoose.model("cb_booking", bookingSchema);
