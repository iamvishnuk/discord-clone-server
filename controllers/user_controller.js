const bcrypt = require("bcrypt");
const USERS = require("../model/user-model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = {
    userRegisteration: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Please enter valid credentials",
                });

            const { email, displayName, userName, phone, password } = req.body;

            const user = await USERS.findOne({ email }).exec();

            if (user) {
                return res
                    .status(409)
                    .json({ message: "Email already exists" });
            }

            const bcryptHashRounds = 10;
            const passwordHash = await bcrypt.hash(password, bcryptHashRounds);

            const newUser = await USERS.create({
                email,
                displayName,
                userName,
                phone,
                password: passwordHash,
            });

            const userId = newUser._id;
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                expiresIn: 300000,
            });

            res.status(201).json({
                message: "New user created successfully",
                token,
                userId,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: error.message,
            });
        }
    },

    userLoging: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Please enter a valid credentials",
                });

            const { email, password } = req.body;

            const user = await USERS.findOne({ email: email });
            if (!user)
                return res.status(404).json({ message: "No user found" });

            const status = await bcrypt.compare(password, user.password);

            if (!status)
                return res
                    .status(404)
                    .json({ message: "Password is incorrect" });

            const userId = user._id;
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                expiresIn: 300000,
            });

            res.status(200).json({
                message: "Logged in successfully",
                userId,
                token,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};
