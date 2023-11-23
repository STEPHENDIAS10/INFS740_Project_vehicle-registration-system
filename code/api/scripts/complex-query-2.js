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

    const booking2 = await bookingModel.create({
        carId: car._id,
        day: "2023-05-10",
        noOfDays: 1,
        user: user._id,
    });

    await reviewModel.create({
        bookingId: booking._id,
        rating: 3,
        feedback: "normal"
    });

    await reviewModel.create({
        bookingId: booking._id,
        rating: 4,
        feedback: "normal"
    });

    await reviewModel.create({
        bookingId: booking2._id,
        rating: 3,
        feedback: "normal"
    });
    
    
    carModel.aggregate([
        {
            $lookup: {
                from: "cb_bookings",
                localField: "_id",
                foreignField: "carId",
                as: "bookings",
            }
        },
        {
            $unwind: {
              path: "$bookings",
              preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "cb_reviews",
                localField: "bookings._id",
                foreignField: "bookingId",
                as: "reviews"
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    title: "$title",
                    make: "$make",
                    year: "$year",
                    image: "$image",
                },
                bookings: { $addToSet: "$bookings" },
                reviews: { $addToSet: "$reviews" },
            }
        }
    ])
    .then(d => console.log(JSON.stringify(d)))

})()
