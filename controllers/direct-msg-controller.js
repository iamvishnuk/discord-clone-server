const DIRECT_MSG_MODEL = require("../model/direct-msg-model");
const { validationResult } = require("express-validator");

module.exports = {
    directChat: async (req, res) => {
        try {
            const userId = req.userId;
            const { to, message } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Something went wrong",
                });
            }

            const directMsg = await DIRECT_MSG_MODEL.findOne({
                $or: [
                    { user1: userId, user2: to },
                    { user1: to, user2: userId },
                ],
            });

            if (!directMsg) {
                await DIRECT_MSG_MODEL.create({
                    user1: userId,
                    user2: to,
                    messages: [
                        {
                            sender: userId,
                            text: message,
                        },
                    ],
                });
                return res.status(200).json({ message: "success" });
            }

            directMsg.messages.push({ sender: userId, text: message });
            await directMsg.save();

            res.status(200).json({ message: "success" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Internal Server Error",
            });
        }
    },
};
