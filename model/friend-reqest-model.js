const mongoose = require("mongoose");

const friendReqModel = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    to: {
        type: String,
        required: true,
    },
    reqDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});

module.exports = mongoose.model("friendReq", friendReqModel);
