const { getCars, addCar, updateCar, deleteCar } = require("../controllers/car.controller");

const router = require("express").Router();

router.get("/", getCars);
router.post("/", addCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;