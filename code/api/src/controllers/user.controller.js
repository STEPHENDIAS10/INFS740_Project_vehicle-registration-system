const userModel = require("../models/user.model");

// Complex-Query-3
exports.getMyBookings = async (req, res) => {
    if (req.user) {
        const user = await userModel.aggregate([
            {
                $match: {
                    _id: req.user ? req.user._id : ""
                }
            },
            {
                $lookup: {
                    from: "cb_bookings",
                    localField: "_id",
                    foreignField: "user",
                    as: "bookings"
                }
            },
            {
                $unwind: {
                    path: "$bookings",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $lookup: {
                    from: "cb_cars",
                    localField: "bookings.carId",
                    foreignField: "_id",
                    as: "cars",
                } 
            },
            {
                $group: {
                    _id: {
                        id: "$id",
                        username: "$username",
                        email: "$email",
                        name: "$name",
                    },
                    bookings: { $addToSet: "$bookings" },
                    cars: { $addToSet: "$cars" },
                }
            }
        ])
        res.send(user);
    }
    else {
        res.status(401).send({ error: "Login to continue" });
    }
}

exports.registerUser = async (req, res) => {
    try {

        const { username, email, name } = req.body;
        if (!username || !email || !name) {
            return res.status(400).send({ error: "Required fields were not provided" });
        }

        const user = new userModel(req.body);
        await user.save();
        res.send({ data: user });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ error: "Username already taken" });
        }
        else {
            console.log(error)
            res.status(500).send({ error: "Internal server error" });
        }
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = await userModel.findOne({ username: req.params.username });
        res.send({ data });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }
}

exports.updateUser = async (req, res) => {
    if (req.user) {
        const data = await userModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });
        res.send({ data });
    }
    else {
        res.status(401).send({ "error": "Login to continue" });
    }
}

exports.deleteUser = async (req, res) => {
    if (req.user) {
        const data = await userModel.findOneAndDelete({ _id: req.user._id });
        res.send({ data });
    }
    else {
        res.status(401).send({ "error": "Login to continue" });
    }
};