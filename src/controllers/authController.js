const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { Users } = require("../../db/models");
const jwtGen = require("../utils/jwtGenerator");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const ValidationError = require("../errors/ValidationError");

module.exports = {
	register: async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const message = errors
				.array()
				.map((r) => r.msg)
				.join(" | ");
			return next(new ValidationError(message));
		}

		try {
			const { name, username, email, password, address, phone_number } =
				req.body;
			const checkUser = await Users.findOne({
				where: { email },
			});
			if (checkUser) {
				throw new ValidationError("User already exist");
			}

			const bcryptPassword = await bcrypt.hash(
				password,
				bcrypt.genSaltSync(10)
			);

			const newUser = await Users.create({
				name,
				username,
				email,
				role: "USER",
				address,
				phone_number,
				password: bcryptPassword,
			});

			res.status(201).json({
				message: "Success Creating New User",
				user: {
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
					role: newUser.role,
					address: newUser.address,
					phone_number: newUser.phone_number,
				},
			});
		} catch (error) {
			next(error);
		}
	},
	login: async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const checkUser = await Users.findOne({
				where: { email },
			});
			if (!checkUser) {
				throw new UnauthenticatedError("Email not found");
			}
			const passwordIsValid = bcrypt.compareSync(
				password,
				checkUser.password
			);
			if (!passwordIsValid) {
				throw new UnauthenticatedError("Invalid password");
			}

			const token = jwtGen(
				checkUser.dataValues.id,
				checkUser.dataValues.name,
				checkUser.dataValues.username,
				checkUser.dataValues.email,
				checkUser.dataValues.role,
				checkUser.dataValues.address,
				checkUser.dataValues.phone_number
			);
			return res.json({
				user: {
					id: checkUser.dataValues.id,
					name: checkUser.dataValues.name,
					role: checkUser.dataValues.role,
				},
				accessToken: token,
			});
		} catch (error) {
			next(error);
		}
	},
};
