const { userRegisteration } = require("../controllers/user_controller");
const { registerationValidator } = require("../middlewares/validator");

const router = require("express").Router();

router.post("/register", registerationValidator, userRegisteration);

module.exports = router;
