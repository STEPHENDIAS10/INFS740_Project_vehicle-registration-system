const { registerUser, getUser, getMyBookings, updateUser, deleteUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/register", registerUser);
router.get("/my-bookings", getMyBookings);
router.get("/:username", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;