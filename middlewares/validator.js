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
            .withMessage("UserName contain at least 3 characters")
            .custom((value) => !/\s/.test(value))
            .withMessage("No space are allowed in the password"),
        check("phone")
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

    loginValidator: [
        check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((value) => !/\s/.test(value))
            .withMessage("No space are allowed in the password"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .custom((value) => !/\s/.test(value))
            .withMessage("No space are allowed in the password"),
    ],

    addFriendValidato: [
        check("frndUserName")
            .not()
            .isEmpty()
            .withMessage("Please enter a valid user name")
            .custom((value) => !/\s/.test(value))
            .withMessage("Please enter a valid user name")
            .isLength({ min: 3 })
            .withMessage("serName contain at least 3 characters"),
    ],

    directChatValidator: [
        check("to")
            .not()
            .isEmpty()
            .withMessage("receiver user id is not found")
            .custom((value) => /^[a-zA-Z0-9]+$/.test(value))
            .withMessage("Invalid receiver user id"),
        check("message")
            .not()
            .isEmpty()
            .withMessage("message is empty")
    ],
};
