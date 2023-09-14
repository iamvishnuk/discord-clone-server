const { check } = require("express-validator");

module.exports = {
    registerationValidator: [
        check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email"),
        check("displayName")
            .not()
            .isEmpty()
            .withMessage("DisplayName is required")
            .isLength({ min: 3 })
            .withMessage("DisplayName contain at least 3 characters"),
        check("userName")
            .not()
            .isEmpty()
            .withMessage("Username is required")
            .isLength({ min: 3 })
            .withMessage("UserName contain at least 3 characters"),
        check("mobile")
            .not()
            .isEmpty()
            .withMessage("Mobile is required")
            .isLength({ min: 10, max: 10 })
            .withMessage("Enter a valid mobile number")
            .matches(/^[0-9]+$/)
            .withMessage("Mobile should only contain numbers"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .custom((value) => !/\s/.test(value))
            .withMessage("No space are allowed in the password"),
    ],
};
