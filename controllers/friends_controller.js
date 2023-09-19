const FRIEND_REQ = require("../model/friend-reqest-model");
const USERS = require("../model/user-model");
const { validationResult } = require("express-validator");

module.exports = {
    addFriend: async (req, res) => {
        try {
            const to = req.body.to;
            const userId = req.userId;
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Please enter valid user name",
                });

            await FRIEND_REQ.create({
                from: userId,
                to: to,
            });

            res.status(200).json({ message: "Request sent successfully" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal Server Error",
            });
        }
    },

    getPendingRequests: async (req, res) => {
        try {
            const userId = req.userId;
            const user = await USERS.findOne({ _id: userId });
            const requests = await FRIEND_REQ.find({
                to: user.userName,
            }).populate("from");

            const data = requests.map((req) => ({
                _id: req._id,
                from: req.from._id,
                displayName: req.from.displayName,
                userName: req.from.userName,
                createdAt: req.from.createdAt,
            }));

            res.status(200).json({ request: data });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal Server error",
            });
        }
    },

    acceptFriendRequest: async (req, res) => {
        try {
            const friendId = req.body.friendId;
            const userId = req.userId;
            const requestId = req.body.requestId;

            const promises = [
                USERS.findByIdAndUpdate(userId, {
                    $push: { friends: friendId },
                }),
                USERS.findByIdAndUpdate(friendId, {
                    $push: { friends: userId },
                }),
                FRIEND_REQ.findByIdAndDelete(requestId)
            ];

            await Promise.all(promises)
            res.status(200).json({
                message: "Friend request accepted successfully",
            });

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal server error",
            });
        }
    },
};
