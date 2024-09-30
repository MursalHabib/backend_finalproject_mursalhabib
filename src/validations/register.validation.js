const { body } = require("express-validator");

module.exports = [
	body("name").notEmpty().withMessage("Name is required"),
	body("username").notEmpty().withMessage("Username is required"),
	body("username")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 5 characters long"),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email")
		.custom((value) => {
			if (!value.includes("@")) {
				throw new Error("Provide valid email");
			}

			return true;
		}),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number"),

	body("phone_number")
		.isLength({ min: 10 })
		.withMessage("Phone number must be at least 10 characters long"),
];
