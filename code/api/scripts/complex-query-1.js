const userModel = require("../src/models/user.model");
const carModel = require("../src/models/car.model");
const bookingModel = require("../src/models/booking.model");
const mongoose = require("mongoose");
const reviewModel = require("../src/models/review.model");

require("dotenv").config();
require("../src/utils/connection");

(async () => {

    await mongoose.connection.collection("cb_cars").drop()
    .then(() => console.log("Dropped cars"));

    await mongoose.connection.collection("cb_bookings").drop()
    .then(() => console.log("Dropped bookings"));

    const user = await userModel.create({
        username: "ABC" + Date.now(),
        email: "abc" + Date.now() + "@abc.com",
        name: "ABC A",
    });

    const car = await carModel.create({
        title: "ABC",
        model: "ABC",
        make: "ABC",
        year: 1998,
    });
    
    const booking = await bookingModel.create({
        carId: car._id,
        day: "2023-04-10",
        noOfDays: 1,
        user: user._id,
    });

    await reviewModel.create({
        bookingId: booking._id,
        rating: 3,
        feedback: "normal"
    });
    
    bookingModel.aggregate([
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
    ])
    .then(d => console.log(d[0]));
})()
