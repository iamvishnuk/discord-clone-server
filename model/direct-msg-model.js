const mongoose = require("mongoose");

const directMsgModel = new mongoose.Schema({
    // Reference of the user 1
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    // Reference of the user 2
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    // Message exchanged in chat
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
});

module.exports = mongoose.model("directMsgModel", directMsgModel);
