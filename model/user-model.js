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
        unique: true,
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});

module.exports = mongoose.model("user", userModel);
