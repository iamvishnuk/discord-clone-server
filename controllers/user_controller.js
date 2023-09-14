const bcrypt = require("bcrypt");
const USERS = require("../model/user-model");
const { validationResult } = require("express-validator");

module.exports = {
    userRegisteration: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                let { email, displayName, userName, phone, password } =
                    req.body;
                const user = await USERS.findOne({ email: email });
                if (!user) {
                    password = await bcrypt.hash(password, 10);
                    await new USERS({
                        email: email,
                        displayName: displayName,
                        userName: userName,
                        phone: phone,
                        password: password,
                    }).save();
                    res.status(201).json({
                        message: "New user created successfully",
                    });
                } else {
                    res.status(409).json({ message: "Email already exist" });
                }
            } else {
                res.status(401).json({ error: errors });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
