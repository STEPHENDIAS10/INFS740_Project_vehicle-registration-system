const router = require("express").Router();
const userRoutes = require("./user.routes");
const carRoutes = require("./car.routes");
const bookingRoutes = require("./booking.routes");
const reviewRoutes = require("./review.routes");

router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
