const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: [true, "Username should be unique"]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("cb_user", userModel);
