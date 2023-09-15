const { userRegisteration, userLoging } = require("../controllers/user_controller");
const { registerationValidator, loginValidator } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/register", registerationValidator, userRegisteration);
router.post("/login", loginValidator, userLoging)

module.exports = router;
