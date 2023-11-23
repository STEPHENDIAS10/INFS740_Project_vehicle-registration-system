const bookingModel = require("../src/models/booking.model");
const carModel = require("../src/models/car.model");
const userModel = require("../src/models/user.model");
const mongoose = require("mongoose");
require("dotenv").config();
require("../src/utils/connection");


//userModel.deleteMany({})
//.then((d) => {
//    console.log("Resetting user collection done successfully", d);
//});
//
//
//bookingModel.deleteMany({})
//.then((d) => {
//    console.log("Resetting booking collection done successfully", d);
//});
//
//carModel.deleteMany({})
//.then((d) => {
//    console.log("Resetting car collection done successfully", d);
//});

(async () => {
    mongoose.connection.collection("cb_cars").drop()
    .then(() => console.log("Dropped cars"));

    mongoose.connection.collection("cb_bookings").drop()
    .then(() => console.log("Dropped bookings"));
})()