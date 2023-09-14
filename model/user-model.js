const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    displayName: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("user", userModel);
