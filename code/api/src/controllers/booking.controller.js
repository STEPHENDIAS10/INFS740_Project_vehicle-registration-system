const bookingModel = require("../models/booking.model");
const moment = require("moment");

// Complex-Query-1
exports.getBookings = async (req, res) => {
    const bookings = await bookingModel.aggregate([
        {
            $lookup: {
                from: "cb_cars",
                localField: "carId",
                foreignField: "_id",
                as: "car"
            }
        },
        {
            $lookup: {
                from: "cb_users",
                localField: "user",
                foreignField: "_id",
                as: "bookedBy"
            }   
        },
        {
            $lookup: {
                from: "cb_reviews",
                localField: "_id",
                foreignField: "bookingId",
                as: "review"
            }   
        },
    ]);
    res.send(bookings);
}

exports.getCarBooking = async (req, res) => {
    const { carId } = req.params;
    const bookings = await bookingModel.find({ carId });
    res.send(bookings);
}

exports.bookCar = async (req, res) => {
    try {
    const { carId, day, noOfDays } = req.body;
    if (!req.user) {
        res.status(401).send({ error: "Login to continue" });
    }
    req.body.user = req.user?._id;
    
    if (!carId || !day || !noOfDays) {
        return res.status(400).send({ error: "Required parameters are not provided or are incorrect" });
    }

    const startDate = new Date(day);
    const endDate = moment(new Date(day)).add(noOfDays, "days").toDate();

    const maxBookingDays = parseInt(process.env.MAX_BOOKING_DAYS);
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const bookedDates = new Set();

    const bookings = await bookingModel.find({
        carId,
        $or: [
            {startDate: { $gte: startDate - (maxBookingDays * ONE_DAY) }},
            {endDate: { $lte: endDate + (maxBookingDays * ONE_DAY) }}
        ]
    });

    bookings.forEach(booking => {
        for (let i = 0; i < booking.noOfDays; i++) {
            const day = moment(new Date(booking.day)).add(i, "days").format("YYYY-MM-DD");
            bookedDates.add(day);
        }
    });

    const currentDays = [];
    for (let i = 0; i < noOfDays; i++) {
        currentDays.push(
            moment(new Date(day)).add(i, "days").format("YYYY-MM-DD")
        );
    }

    const available = !(currentDays.some(day => bookedDates.has(day)));

    if (available) {
        const booking = new bookingModel(req.body);
        await booking.save();
        res.send({ data: booking });
    }
    else {
        res.status(404).send({ "error": "Car not available in these dates" });
    }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.deleteBooking = async (req, res) => {
    const data = await bookingModel.findOneAndDelete({ _id: req.params.id });
    res.send({ data });
}

exports.updateBooking = async (req, res) => {
    const data = await bookingModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.send({data})
}