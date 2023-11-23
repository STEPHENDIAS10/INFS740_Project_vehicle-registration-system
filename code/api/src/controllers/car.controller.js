const carModel = require("../models/car.model");

// Complex-Query-2
exports.getCars = async (req, res) => {
    const cars = await carModel.aggregate([
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
                    price: "$price"
                },
                bookings: { $addToSet: "$bookings" },
                reviews: { $addToSet: "$reviews" },
            }
        }
    ]);
    res.send(cars);
}

exports.addCar = async (req, res) => {
    try {
        const { title, make, year } = req.body;
        if (!title || !make || !year) {
            return res.status(400).send({ error: "Required fields were not provded" });
        }
        
        const car = new carModel(req.body);
        await car.save();
        res.send(car);
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.deleteCar = async (req, res) => {
    try {
        const data = await carModel.deleteOne({ _id: req.params.id });
        res.send({ data });
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.updateCar = async (req, res) => {
    try {
        const data = await carModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ data });
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}