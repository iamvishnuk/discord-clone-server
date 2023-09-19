const jwt = require("jsonwebtoken");

module.exports.userAuthentication = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "There is not token" });
        } else {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
                if (err) {
                    return res
                        .status(401)
                        .json({
                            message: "Invalide token",
                            error: err.message,
                        });
                } else {
                    console.log("Authentication done")
                    req.userId = decode.userId;
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
