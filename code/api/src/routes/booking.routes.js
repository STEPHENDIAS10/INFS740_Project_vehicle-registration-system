const { 
    getBookings, getCarBooking, bookCar, 
    updateBooking, deleteBooking 
} = require("../controllers/booking.controller");

const router = require("express").Router();

router.get("/", getBookings);
router.get("/:carId", getCarBooking);
router.post("/book", bookCar);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
