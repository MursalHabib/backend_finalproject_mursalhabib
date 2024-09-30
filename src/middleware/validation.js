const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");

module.exports = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const error = new ValidationError(result.array());
		return next(error);
	}

	next();
};
