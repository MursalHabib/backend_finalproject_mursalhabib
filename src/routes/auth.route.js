const router = require("express").Router();
const { login, register } = require("../controllers/authController");
const registerValidation = require("../validations/register.validation");

router.post("/login", login);
router.post("/register", registerValidation, register);

module.exports = router;
