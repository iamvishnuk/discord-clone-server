const FRIEND_REQ = require("../model/friend-reqest-model");
const USERS = require("../model/user-model");
const { validationResult } = require("express-validator");

module.exports = {
    // for handling adding new frinds
    addFriend: async (req, res) => {
        try {
            const to = req.body.frndUserName;
            const userId = req.userId;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Please enter valid user name",
                });
            }

            const frnd = await USERS.findOne({ userName: to });
            if (!frnd) {
                return res.status(404).json({
                    message: "No user found Please check the user name",
                });
            }

            if (frnd._id.equals(userId)) {
                return res.status(409).json({
                    message: "You can't send frnd request to user self",
                });
            }

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

    // getting all pending friend requests
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

    // handling request accept
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
                FRIEND_REQ.findByIdAndDelete(requestId),
            ];

            await Promise.all(promises);
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

    // hanind the friend request reject
    rejectFriendRequest: async (req, res) => {
        try {
            const requestId = req.params.id;

            // check if the request is exist or not before deleteting the request
            const request = await FRIEND_REQ.findById(requestId);

            if (!request) {
                return res
                    .status(404)
                    .json({ message: "Frined request not found" });
            }

            await FRIEND_REQ.findByIdAndDelete(requestId);
            res.status(200).json({ message: "Friend request rejected" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal server error",
            });
        }
    },

    // function for add the friends to the direct message list
    addFriendToDirectMessageList: async (req, res) => {
        try {
            const dmUserId = req.body.userId;
            const userId = req.userId;
            console.log(dmUserId, req.body);

            // this function will populate the direct message list and return only the neccessay fields
            const updateUser = await USERS.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { directMessage: dmUserId },
                },
                { new: true }
            ).populate({
                path: "directMessage",
                select: "_id userName displayName image",
            });
            console.log(updateUser);
            if (!updateUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "Succefully add Friend to Direct Message List",
                directMessage: updateUser.directMessage,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
                message: "Internal Server error",
            });
        }
    },

    // getting the direct message list
    getDirectMessageList: async (req, res) => {
        try {
            const user = await USERS.findById(req.userId).populate({
                path: "directMessage",
                select: "_id userName displayName image",
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ directMessage: user.directMessage });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal Server Error",
            });
        }
    },
};
