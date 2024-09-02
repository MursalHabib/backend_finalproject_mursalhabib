const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id, name, username, email, role, address, phone_number) {
	const payload = {
		user: {
			id: id,
			name: name,
			username: username,
			email: email,
			role: role,
			address: address,
			phoneNumber: phone_number,
		},
	};

	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
}

module.exports = jwtGenerator;
